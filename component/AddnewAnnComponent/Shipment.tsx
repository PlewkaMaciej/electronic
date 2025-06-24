import React from "react";
import { useFormikContext } from "formik";
import { FormValues } from "../../src/AddnewAnn";

const Shipment: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  const togglePickup = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("pickup", e.target.checked);
  };

  const toggleShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("shipping", e.target.checked);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Sposób dostawy</h2>

      <div className="space-y-6">
        {/* Odbiór osobisty */}
        <div className="flex items-center justify-between relative">
          <label
            htmlFor="pickup"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            Odbiór osobisty
          </label>
          <input
            id="pickup"
            type="checkbox"
            checked={values.pickup}
            onChange={togglePickup}
            className="w-12 h-6 appearance-none bg-gray-300 rounded-full relative cursor-pointer transition-colors duration-300 ease-in-out checked:bg-green-500"
          />
          {/* Kółko w przełączniku */}
          <span
            className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out pointer-events-none ${
              values.pickup ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>

        {/* Wysyłka */}
        <div className="flex items-center justify-between relative">
          <label
            htmlFor="shipping"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            Wysyłka
          </label>
          <input
            id="shipping"
            type="checkbox"
            checked={values.shipping}
            onChange={toggleShipping}
            className="w-12 h-6 appearance-none bg-gray-300 rounded-full relative cursor-pointer transition-colors duration-300 ease-in-out checked:bg-green-500"
          />
          <span
            className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out pointer-events-none ${
              values.shipping ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Shipment;
