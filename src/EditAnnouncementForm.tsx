// src/components/EditAnnouncementForm.tsx
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import api from "../src/api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Description from "../component/AddnewAnnComponent/Description";
import ImagesUpload from "../component/AddnewAnnComponent/Images";
import Prize from "../component/AddnewAnnComponent/Prize";
import Shipment from "../component/AddnewAnnComponent/Shipment";
import Specification from "../component/AddnewAnnComponent/Specification";
import Type from "../component/AddnewAnnComponent/Type";
import LocationPicker from "./locationPicker/locationPicker";

import { useMutation, useQueryClient } from "react-query";

import { useSelector } from "react-redux";

import { RootState } from "./store";

import { FormValues } from "./AddnewAnn";

function markNestedTouched(obj: any): any {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] =
      typeof obj[key] === "object" ? markNestedTouched(obj[key]) : true;
    return acc;
  }, {} as any);
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(5, "Minimum 5 znaków")
    .required("Tytuł jest wymagany"),
  description: Yup.string()
    .min(20, "Minimum 20 znaków")
    .required("Opis jest wymagany"),
  offerType: Yup.string()
    .oneOf(["Sprzedaż", "Wynajem", "Zamiana", "Usługa", "Inne"])
    .required("Wybierz typ ogłoszenia"),
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
    }),
  pickup: Yup.boolean(),
  shipping: Yup.boolean(),
  images: Yup.array().min(1, "Dodaj co najmniej jedno zdjęcie"),
  location: Yup.string().when("pickup", {
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

const EditAnn: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = useSelector((s: RootState) => s.auth.user?._id);

  const [ann, setAnn] = React.useState<FormValues | null>(null);
  const [fields, setFields] = React.useState<any[]>([]);

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: async (values: FormValues) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => {
        if (key === "images") {
          (val as File[]).forEach((file) => formData.append("images", file));
        } else {
          formData.append(
            key,
            typeof val === "object" ? JSON.stringify(val) : String(val)
          );
        }
      });

      const { data } = await api.put(`/announcements/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Ogłoszenie zaktualizowane!");
      if (userId) queryClient.invalidateQueries(["userAnnouncements", userId]);
      navigate("/my-ads");
    },
    onError: () => {
      toast.error("Błąd podczas edycji ogłoszenia.");
    },
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/announcements/getSingleAnn/${id}`);
        setAnn({
          category: data.category,
          title: data.title,
          specification: data.specification || {},
          description: data.description,
          offerType: data.offerType,
          price: data.price,
          negotiable: data.negotiable,
          minPrice: data.minPrice || "",
          pickup: data.pickup,
          shipping: data.shipping,
          images: [], // nie edytujemy istniejących – zakładamy nowe
          location: data.location,
        });
        setFields(data.fields || []);
      } catch (err) {
        toast.error("Nie udało się pobrać ogłoszenia.");
        navigate("/my-ads");
      }
    };
    fetchData();
  }, [id, navigate]);

  if (!ann) return <p className="text-center mt-10">Ładowanie danych...</p>;

  return (
    <Formik<FormValues>
      initialValues={ann}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values, { setTouched, validateForm }) => {
        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
          const tf: any = {};
          Object.keys(errors).forEach((k) => (tf[k] = true));
          if (errors.specification) {
            tf.specification = markNestedTouched(errors.specification);
          }
          setTouched(tf, false);
          toast.error("Popraw błędy formularza.");
          return;
        }
        mutate(values);
      }}
    >
      {({ values, setFieldValue, touched, errors }) => (
        <Form className="mt-5 space-y-6">
          <Specification fields={fields} />
          <ImagesUpload />
          <Description />
          <Type />
          <Prize />
          <Shipment />

          {values.pickup && (
            <>
              <LocationPicker
                city={values.location}
                onCityChange={(city) => setFieldValue("location", city)}
              />
              {touched.location && errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
            </>
          )}

          <div className="text-right max-w-6xl mx-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-xl text-white ${
                isSubmitting ? "bg-gray-400" : "hover:bg-[#00597A] bg-[#006F91]"
              }`}
            >
              {isSubmitting ? "Zapisywanie…" : "Zapisz zmiany"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditAnn;
