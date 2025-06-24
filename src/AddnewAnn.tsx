import { Formik, Form } from "formik";
import CategoryAnn from "../component/AddnewAnnComponent/Category";
import Specification from "../component/AddnewAnnComponent/Specification";
import Description from "../component/AddnewAnnComponent/Description";
import Type from "../component/AddnewAnnComponent/Type";
import Prize from "../component/AddnewAnnComponent/Prize";
import Shipment from "../component/AddnewAnnComponent/Shipment";
import api from "./api/axios";
import { useFormikContext } from "formik";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

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

const fetchSpecs = async (category: string) => {
  const { data } = await api.get<{ fields: any[] }>(
    `/category-specs/${encodeURIComponent(category)}`
  );
  return data.fields;
};

const AddnewAnn: React.FC = () => {
  return (
    <Formik<FormValues>
      initialValues={{
        category: "",
        title: "",
        specification: {},
        description: "",
        offerType: "Sprzedaż",
        pickupOnly: false,
        onlineSale: false,
        price: "",
        negotiable: false,
        minPrice: "",
        pickup: false,
        shipping: false,
      }}
      onSubmit={() => {}}
    >
      {() => <InnerForm />}
    </Formik>
  );
};

const InnerForm: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const navigate = useNavigate();

  // Pobieranie specyfikacji kategorii
  const { data: fields, isLoading, isError } = useQuery(
    ["categorySpecs", values.category],
    () => fetchSpecs(values.category),
    {
      enabled: !!values.category,
      onSuccess: () => {
        setFieldValue("specification", {});
      },
    }
  );

  // Mutacja - tworzenie ogłoszenia
  const { mutate, isLoading: isSubmitting, isError: isSubmitError } = useMutation({
    mutationFn: async (newAnnouncement: FormValues) => {
      const { data } = await api.post("/announcements/create", newAnnouncement);
      return data;
    },
    onSuccess: () => {
      // navigate("/moje-ogloszenia"); 
      console.log("oh yea")
    },
  });

  const handleFormSubmit = () => {
    mutate(values);
  };

  return (
    <Form
      className="mt-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}
    >
      <CategoryAnn />

      {isLoading && <p className="text-center">Ładowanie specyfikacji…</p>}
      {isError && (
        <p className="text-center text-red-500">Błąd podczas pobierania specyfikacji.</p>
      )}
      {fields && <Specification fields={fields} />}

      <Description />
      <Type />
      <Prize />
      <Shipment />

      {isSubmitError && (
        <p className="text-center text-red-500 mt-4">Błąd podczas tworzenia ogłoszenia.</p>
      )}

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
};

export default AddnewAnn;
