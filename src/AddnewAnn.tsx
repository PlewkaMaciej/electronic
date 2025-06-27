import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import CategoryAnn from "../component/AddnewAnnComponent/Category";
import Specification from "../component/AddnewAnnComponent/Specification";
import Description from "../component/AddnewAnnComponent/Description";
import Type from "../component/AddnewAnnComponent/Type";
import Prize from "../component/AddnewAnnComponent/Prize";
import Shipment from "../component/AddnewAnnComponent/Shipment";

import api from "./api/axios";

export interface FormValues {
  category: string;
  title: string;
  specification: Record<string, any>;
  description: string;
  offerType: string;
  pickupOnly: boolean;
  onlineSale: boolean;
  price: string;
  negotiable: boolean;
  minPrice: string;
  pickup: boolean;
  shipping: boolean;
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
    .min(5, "Tytuł musi mieć co najmniej 5 znaków")
    .required("Tytuł jest wymagany"),

  description: Yup.string()
    .min(20, "Opis musi mieć co najmniej 20 znaków")
    .required("Opis jest wymagany"),

  offerType: Yup.string()
    .required("Wybierz rodzaj ogłoszenia")
    .oneOf(
      ["Sprzedaż", "Wynajem", "Zamiana", "Usługa", "Inne"],
      "Nieprawidłowy typ"
    ),

  price: Yup.number()
    .typeError("Cena musi być liczbą")
    .positive("Cena musi być większa niż 0")
    .required("Cena jest wymagana"),

  negotiable: Yup.boolean(),

  minPrice: Yup.number()
    .typeError("Minimalna cena musi być liczbą")
    .positive("Minimalna cena musi być większa niż 0")
    .when("negotiable", {
      is: true,
      then: (schema) =>
        schema.required("Minimalna cena jest wymagana przy negocjacji"),
      otherwise: (schema) => schema.notRequired(),
    }),

  pickup: Yup.boolean(),
  shipping: Yup.boolean(),

  // dynamic spec validation
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

      // znajdź pierwsze puste pole
      const empty = Object.entries(spec).find(
        ([, v]) => v === "" || v === undefined || v === null
      );
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
  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: async (newAnnouncement: FormValues) => {
      const { data } = await api.post("/announcements/create", newAnnouncement);
      return data;
    },
    onSuccess: () => {
      toast.success("Ogłoszenie zostało dodane!");
      navigate("/my-ads");
    },
    onError: () => {
      toast.error("Błąd podczas tworzenia ogłoszenia.");
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
        pickupOnly: false,
        onlineSale: false,
        price: "",
        negotiable: false,
        minPrice: "",
        pickup: false,
        shipping: false,
      }}
      validationSchema={AddNewAnnSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async (values, { setTouched, validateForm }) => {
        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
          // oznacz wszystkie pola jako touched
          const touchedFields: any = {};
          Object.keys(errors).forEach((k) => (touchedFields[k] = true));
          if (errors.specification) {
            touchedFields.specification = markNestedTouched(
              errors.specification
            );
          }
          setTouched(touchedFields, false);
          toast.error("Popraw błędy formularza przed zapisaniem.");
          return;
        }
        mutate(values);
      }}
    >
      {({ values, setTouched }) => {
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
          <Form className="mt-5">
            <CategoryAnn />
            {isLoading && (
              <p className="text-center">Ładowanie specyfikacji…</p>
            )}
            {isError && (
              <p className="text-center text-red-500">
                Błąd podczas pobierania specyfikacji.
              </p>
            )}
            {fields && <Specification fields={fields} />}
            <Description />
            <Type />
            <Prize />
            <Shipment />
            <div className="max-w-6xl mx-auto text-right p-6">
              <button
                type="submit"
                className={`px-6 py-2 rounded-xl shadow text-white ${
                  isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Zapisywanie..." : "Zapisz ogłoszenie"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddnewAnn;
