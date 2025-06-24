import React from "react";
import { useFormikContext } from "formik";
import { FormValues } from "../../src/AddnewAnn";

const Type: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Rodzaj ogłoszenia</h2>

      <div className="space-y-6">
        {/* Typ ogłoszenia */}
        <div>
          <label
            htmlFor="offerType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Typ ogłoszenia
          </label>
          <select
            id="offerType"
            name="offerType"
            value={values.offerType}
            onChange={(e) => setFieldValue("offerType", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="Sprzedaż">Sprzedaż</option>
            <option value="Wynajem">Wynajem</option>
            <option value="Zamiana">Zamiana</option>
            <option value="Usługa">Usługa</option>
            <option value="Inne">Inne</option>
          </select>
        </div>

        {/* Odbiór osobisty */}
        <div className="flex items-center justify-between relative">
          <label htmlFor="pickupOnly" className="text-sm font-medium text-gray-700">
            Odbiór osobisty
          </label>
          <input
            id="pickupOnly"
            name="pickupOnly"
            type="checkbox"
            checked={values.pickupOnly}
            onChange={(e) => setFieldValue("pickupOnly", e.target.checked)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
              }
            }}
            className="w-12 h-6 appearance-none bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 ease-in-out checked:bg-green-500"
          />
          {/* Kółko w przełączniku */}
          <span
            className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
              values.pickupOnly ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>

        {/* Sprzedaż online */}
        <div className="flex items-center justify-between relative">
          <label htmlFor="onlineSale" className="text-sm font-medium text-gray-700">
            Sprzedaż online
          </label>
          <input
            id="onlineSale"
            name="onlineSale"
            type="checkbox"
            checked={values.onlineSale}
            onChange={(e) => setFieldValue("onlineSale", e.target.checked)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
              }
            }}
            className="w-12 h-6 appearance-none bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 ease-in-out checked:bg-green-500"
          />
          <span
            className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
              values.onlineSale ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Type;
