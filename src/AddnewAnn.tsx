// src/AddnewAnn.tsx
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CategoryAnn from "../component/AddnewAnnComponent/Category";
import Specification from "../component/AddnewAnnComponent/Specification";
import ImagesUpload from "../component/AddnewAnnComponent/Images";
import Description from "../component/AddnewAnnComponent/Description";
import Type from "../component/AddnewAnnComponent/Type";
import Prize from "../component/AddnewAnnComponent/Prize";
import Shipment from "../component/AddnewAnnComponent/Shipment";

import LocationPicker, { Location } from "./locationPicker/locationPicker";
import api from "./api/axios";
import type { RootState } from "./store";

export interface FormValues {
  category: string;
  title: string;
  specification: Record<string, any>;
  description: string;
  offerType: string;
  price: string;
  negotiable: boolean;
  minPrice: string;
  pickupOnly: boolean;
  onlineSale: boolean;
  images: File[];
  location: Location | null;
}

function markNestedTouched(obj: any): any {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] =
      typeof obj[key] === "object" ? markNestedTouched(obj[key]) : true;
    return acc;
  }, {} as any);
}

export const AddNewAnnSchema = Yup.object().shape({
  category: Yup.string().required("Kategoria jest wymagana"),
  title: Yup.string()
    .min(5, "Minimum 5 znaków")
    .required("Tytuł jest wymagany"),
  description: Yup.string()
    .min(20, "Minimum 20 znaków")
    .required("Opis jest wymagany"),
  offerType: Yup.string()
    .required("Wybierz typ ogłoszenia")
    .oneOf(["Sprzedaż", "Wynajem", "Zamiana", "Usługa", "Inne"]),
  price: Yup.number()
    .typeError("Cena musi być liczbą")
    .positive("Cena musi być > 0")
    .required("Cena jest wymagana"),
  negotiable: Yup.boolean(),
  minPrice: Yup.number()
    .typeError("Minimalna cena musi być liczbą")
    .positive("Minimalna cena musi być > 0")
    .when("negotiable", {
      is: true,
      then: (schema) => schema.required("Podaj minimalną cenę"),
      otherwise: (schema) => schema.notRequired(),
    }),
  pickupOnly: Yup.boolean(),
  onlineSale: Yup.boolean(),
  images: Yup.array().min(1, "Dodaj co najmniej jedno zdjęcie"),
  location: Yup.object<Location>()
    .nullable()
    .when("pickupOnly", {
      is: true,
      then: (schema) =>
        schema.required("Wskaż miasto odbioru przy odbiorze osobistym"),
      otherwise: (schema) => schema.notRequired(),
    }),
  specification: Yup.object().test(
    "all-required",
    "Wypełnij wszystkie wymagane pola specyfikacji",
    function (spec) {
      if (!spec || typeof spec !== "object") {
        return this.createError({
          path: "specification",
          message: "Wypełnij specyfikację",
        });
      }
      const empty = Object.entries(spec).find(([, v]) => v === "" || v == null);
      if (empty) {
        return this.createError({
          path: `specification.${empty[0]}`,
          message: "To pole jest wymagane",
        });
      }
      return true;
    }
  ),
});

const fetchSpecs = async (category: string) => {
  const { data } = await api.get<{ fields: any[] }>(
    `/category-specs/${encodeURIComponent(category)}`
  );
  return data.fields;
};

const AddnewAnn: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = useSelector((s: RootState) => s.auth.user?._id);

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: async (values: FormValues) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => {
        if (key === "images") {
          (val as File[]).forEach((file) => formData.append("images", file));
        } else if (key === "location" && val) {
          formData.append("location", JSON.stringify(val));
        } else {
          formData.append(
            key,
            typeof val === "object" ? JSON.stringify(val) : String(val)
          );
        }
      });
      return (
        await api.post("/announcements/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data;
    },
    onSuccess: () => {
      toast.success("Ogłoszenie dodane!");
      if (userId) queryClient.invalidateQueries(["userAnnouncements", userId]);
      navigate("/my-ads");
    },
    onError: () => {
      toast.error("Błąd podczas dodawania ogłoszenia.");
    },
  });

  return (
    <Formik<FormValues>
      initialValues={{
        category: "",
        title: "",
        specification: {},
        description: "",
        offerType: "",
        price: "",
        negotiable: false,
        minPrice: "",
        pickupOnly: false,
        onlineSale: false,
        images: [],
        location: null,
      }}
      validationSchema={AddNewAnnSchema}
      validateOnChange
      validateOnBlur
      onSubmit={async (values, { setTouched, validateForm }) => {
        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
          const touchedFields: any = {};
          Object.keys(errors).forEach((k) => (touchedFields[k] = true));
          if (errors.specification) {
            touchedFields.specification = markNestedTouched(
              errors.specification
            );
          }
          setTouched(touchedFields, false);
          toast.error("Popraw błędy przed zapisaniem.");
          return;
        }
        mutate(values);
      }}
    >
      {({ values, setFieldValue, setTouched, touched, errors }) => {
        const {
          data: fields,
          isLoading,
          isError,
        } = useQuery(
          ["categorySpecs", values.category],
          () => fetchSpecs(values.category),
          {
            enabled: !!values.category,
            onSuccess: () => setTouched({ specification: {} }),
          }
        );

        return (
          <Form className="mt-5 space-y-6">
            <CategoryAnn />

            <LocationPicker
              selectedLocation={values.location}
              onLocationChange={(loc) => setFieldValue("location", loc)}
            />
            {touched.location && errors.location && (
              <p className="text-red-500 text-sm">{errors.location}</p>
            )}

            {isLoading && (
              <p className="text-center">Ładowanie specyfikacji…</p>
            )}
            {isError && (
              <p className="text-center text-red-500">
                Błąd pobierania specyfikacji.
              </p>
            )}
            {fields && <Specification fields={fields} />}

            <ImagesUpload />
            <Description />
            <Type />
            <Prize />
            <Shipment />

            <div className="max-w-6xl mx-auto text-right p-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-xl shadow text-white ${
                  isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Zapisywanie…" : "Zapisz ogłoszenie"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddnewAnn;
