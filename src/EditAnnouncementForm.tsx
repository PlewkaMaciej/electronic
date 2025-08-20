import React, { useEffect, useMemo, useCallback, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import api from "../src/api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryAnn from "../component/AddnewAnnComponent/Category";
import { useSingleAnnouncement } from "../hooks/useGetSingleAnn";
import Description from "../component/AddnewAnnComponent/Description";
import Prize from "../component/AddnewAnnComponent/Prize";
import Shipment from "../component/AddnewAnnComponent/Shipment";
import Specification from "../component/AddnewAnnComponent/Specification";
import Type from "../component/AddnewAnnComponent/Type";
import LocationPicker from "./locationPicker/locationPicker";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import ImagesUploadEdit from "../component/EditAnn/ImageUploadEdit";

interface EditFormValues {
  category: string;
  title: string;
  specification: Record<string, any>;
  description: string;
  offerType: string;
  price: string | number;
  negotiable: boolean;
  minPrice: string | number;
  pickup: boolean;
  shipping: boolean;
  images: File[]; // nowe pliki
  existingImages: string[]; // URL-e istniejących
  location: string;
}

const validationSchema = Yup.object({
  category: Yup.string().required("Kategoria jest wymagana"),
  title: Yup.string()
    .min(5, "Minimum 5 znaków")
    .required("Tytuł jest wymagany"),
  description: Yup.string()
    .min(20, "Minimum 20 znaków")
    .required("Opis jest wymagany"),
  offerType: Yup.string().required("Wybierz typ ogłoszenia"),
  price: Yup.number()
    .typeError("Cena musi być liczbą")
    .positive()
    .required("Cena jest wymagana"),
  existingImages: Yup.array().min(1, "Musisz mieć przynajmniej jedno zdjęcie"),
  location: Yup.string().when("pickup", {
    is: true,
    then: (schema) => schema.required("Wskaż miasto przy odbiorze osobistym"),
  }),
  specification: Yup.object().test(
    "all-required",
    "Wypełnij specyfikację",
    function (spec) {
      if (!spec || typeof spec !== "object")
        return this.createError({
          path: "specification",
          message: "Wypełnij specyfikację",
        });
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

const EditAnnouncementForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: product, isLoading: loadingProduct } = useSingleAnnouncement(
    id!
  );

  const {
    data: fields,
    isLoading: fieldsLoading,
    isError: fieldsError,
  } = useQuery(
    ["categorySpecs", product?.category],
    () => fetchSpecs(product!.category),
    {
      enabled: !!product?.category,
    }
  );

  const { mutate: updateAnn, isLoading: updating } = useMutation(
    async (fd: FormData) => {
      const { data } = await api.put(`/announcements/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Ogłoszenie zaktualizowane");
        qc.invalidateQueries(["singleAnnouncement", id]);
        qc.invalidateQueries(["userAnnouncements"]);
        navigate(`/Product/${id}`);
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message || "Błąd podczas aktualizacji"
        );
      },
    }
  );

  const initialValues = useMemo<EditFormValues>(() => {
    if (!product) {
      return {
        category: "",
        title: "",
        specification: {},
        description: "",
        offerType: "",
        price: "",
        negotiable: false,
        minPrice: "",
        pickup: false,
        shipping: false,
        images: [],
        existingImages: [],
        location: "",
      };
    }

    return {
      category: product.category || "",
      title: product.title || "",
      specification: product.specification || {},
      description: product.description || "",
      offerType: product.offerType || "",
      price: product.price ?? "",
      negotiable: !!product.negotiable,
      minPrice: product.minPrice ?? "",
      pickup: !!product.pickup,
      shipping: !!product.shipping,
      images: [],
      existingImages: product.images ? [...product.images] : [],
      location:
        (product.location && (product.location.city ?? product.location)) || "",
    };
  }, [product]);

  const prevCategoryRef = useRef<string | null>(null);

  if (loadingProduct)
    return <div className="py-8 text-center">Ładowanie ogłoszenia…</div>;
  if (!product)
    return (
      <div className="py-8 text-center text-red-500">
        Ogłoszenie nie znalezione
      </div>
    );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Edytuj ogłoszenie</h1>

      <Formik<EditFormValues>
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const fd = new FormData();
          fd.append("category", values.category);
          fd.append("title", values.title);
          fd.append("description", values.description);
          fd.append("offerType", values.offerType);
          fd.append("price", String(values.price));
          fd.append("negotiable", String(values.negotiable));
          fd.append("minPrice", String(values.minPrice ?? ""));
          fd.append("pickup", String(values.pickup));
          fd.append("shipping", String(values.shipping));
          fd.append("location", values.location); // ⬅️ STRING, nie JSON
          fd.append("specification", JSON.stringify(values.specification));
          fd.append(
            "existingImages",
            JSON.stringify(values.existingImages || [])
          );
          (values.images || []).forEach((f) => fd.append("images", f));
          updateAnn(fd);
        }}
      >
        {({ values, setFieldValue }) => {
          const handleExistingChange = useCallback(
            (arr: string[]) => setFieldValue("existingImages", arr),
            [setFieldValue]
          );
          const handleNewFilesChange = useCallback(
            (files: File[]) => setFieldValue("images", files),
            [setFieldValue]
          );

          useEffect(() => {
            if (!fields || !values.category) {
              prevCategoryRef.current = values.category || null;
              return;
            }
            if (prevCategoryRef.current === values.category) return;

            const defaults: Record<string, any> = {};
            fields.forEach((f: any) => {
              defaults[f.key] =
                (values.specification && values.specification[f.key]) ?? "";
            });

            setFieldValue("specification", defaults);
            prevCategoryRef.current = values.category;
          }, [fields, values.category, setFieldValue]);

          return (
            <Form className="space-y-6">
              <CategoryAnn />
              {fieldsLoading && <p>Ładowanie specyfikacji…</p>}
              {fieldsError && (
                <p className="text-red-500">Błąd pobierania specyfikacji.</p>
              )}
              {fields && <Specification fields={fields} />}

              <ImagesUploadEdit
                existingImages={values.existingImages}
                onExistingChange={handleExistingChange}
                onNewFilesChange={handleNewFilesChange}
              />

              <Description />
              <Type />
              <Prize />
              <Shipment />

              {values.pickup && (
                <LocationPicker
                  city={values.location}
                  onCityChange={(c) => setFieldValue("location", c)}
                />
              )}

              <div className="text-right">
                <button
                  type="submit"
                  disabled={updating}
                  className={`px-6 py-2 rounded-xl text-white ${
                    updating ? "bg-gray-400" : "bg-[#006F91] hover:bg-[#00597A]"
                  }`}
                >
                  {updating ? "Aktualizowanie…" : "Zapisz zmiany"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditAnnouncementForm;
