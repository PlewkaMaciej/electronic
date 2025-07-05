import React from "react";
import { useFormikContext } from "formik";
import { FormValues } from "../../src/AddnewAnn";

const Type: React.FC = () => {
  const { values, errors, setFieldValue, submitCount } =
    useFormikContext<FormValues>();

  const showError = submitCount > 0 && errors.offerType;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Rodzaj ogłoszenia
      </h2>

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
            value={values.offerType}
            onChange={(e) => setFieldValue("offerType", e.target.value)}
            className={`w-full p-3 border rounded-xl ${
              showError ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="" disabled hidden>
              Wybierz rodzaj ogłoszenia
            </option>
            <option value="Sprzedaż">Sprzedaż</option>
            <option value="Wynajem">Wynajem</option>
            <option value="Zamiana">Zamiana</option>
            <option value="Usługa">Usługa</option>
            <option value="Inne">Inne</option>
          </select>
          {showError && (
            <p className="text-red-500 text-sm mt-1">{errors.offerType}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Type;
