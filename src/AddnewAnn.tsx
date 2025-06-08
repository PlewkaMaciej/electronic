import { Formik, Form } from "formik";
import CategoryAnn from "../component/AddnewAnnComponent/Category";
import Specification from "../component/AddnewAnnComponent/Specification";
import Description from "../component/AddnewAnnComponent/Description";
import Type from "../component/AddnewAnnComponent/Type";
import Prize from "../component/AddnewAnnComponent/Prize";
import Shipment from "../component/AddnewAnnComponent/Shipment";
import api from "./api/axios";
import { useFormikContext } from "formik";
import { useQuery } from "react-query";
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
      onSubmit={(values) => {
        console.log("Wartości formularza:", values);
      }}
    >
      {() => <InnerForm />}
    </Formik>
  );
};

const InnerForm: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  // React Query: pobierz specs gdy category jest ustawione
  const {
    data: fields,
    isLoading,
    isError,
  } = useQuery(
    ["categorySpecs", values.category],
    () => fetchSpecs(values.category),
    {
      enabled: !!values.category,
      onSuccess: () => {
        // resetuj poprzednie dane specyfikacji
        setFieldValue("specification", {});
      },
    }
  );

  return (
    <Form className="mt-5">
      <CategoryAnn />

      {isLoading && <p className="text-center">Ładowanie specyfikacji…</p>}
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
          className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700"
        >
          Zapisz ogłoszenie
        </button>
      </div>
    </Form>
  );
};

export default AddnewAnn;
