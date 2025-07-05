import React from "react";
import { useFormikContext } from "formik";
import { FormValues } from "../../src/AddnewAnn";

const Shipment: React.FC = () => {
  const { values, setFieldValue, submitCount } = useFormikContext<FormValues>();

  const hasError = submitCount > 0 && !values.pickup && !values.shipping;
  const errorMessage = hasError
    ? "Wybierz przynajmniej jedną formę dostawy"
    : "";

  const commonInputClass =
    "w-12 h-6 appearance-none bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 ease-in-out checked:bg-green-500";

  const commonBorderClass = hasError
    ? "border border-red-500 rounded-xl p-2"
    : "";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Sposób dostawy
      </h2>

      <div className="space-y-6">
        {/* Odbiór osobisty */}
        <div
          className={`flex items-center justify-between ${commonBorderClass}`}
        >
          <label htmlFor="pickup" className="text-sm font-medium text-gray-700">
            Odbiór osobisty
          </label>
          <div className="relative">
            <input
              id="pickup"
              type="checkbox"
              checked={values.pickup}
              onChange={(e) => setFieldValue("pickup", e.target.checked)}
              className={commonInputClass}
            />
            <span
              className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out pointer-events-none ${
                values.pickup ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* Wysyłka */}
        <div
          className={`flex items-center justify-between ${commonBorderClass}`}
        >
          <label
            htmlFor="shipping"
            className="text-sm font-medium text-gray-700"
          >
            Wysyłka
          </label>
          <div className="relative">
            <input
              id="shipping"
              type="checkbox"
              checked={values.shipping}
              onChange={(e) => setFieldValue("shipping", e.target.checked)}
              className={commonInputClass}
            />
            <span
              className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out pointer-events-none ${
                values.shipping ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* Błąd walidacji */}
        {hasError && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Shipment;
