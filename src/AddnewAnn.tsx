import { Formik, Form } from "formik";
import CategoryAnn from "../component/AddnewAnnComponent/Category";
import Specification from "../component/AddnewAnnComponent/Specification";
import Description from "../component/AddnewAnnComponent/Description";
import Type from "../component/AddnewAnnComponent/Type";
import Prize from "../component/AddnewAnnComponent/Prize";
import Shipment from "../component/AddnewAnnComponent/Shipment";

const AddnewAnn = () => {
  return (
    <Formik
      initialValues={{
        category: "",
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
      {() => (
        <Form className="mt-5">
          <CategoryAnn />
          <Specification />
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
      )}
    </Formik>
  );
};

export default AddnewAnn;
