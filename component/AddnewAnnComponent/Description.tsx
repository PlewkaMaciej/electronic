import React from "react";
import { useFormikContext } from "formik";
import { FormValues } from "../../src/AddnewAnn";

const Description: React.FC = () => {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<FormValues>();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Opis ogłoszenia
      </h2>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Szczegóły dotyczące sprzętu
        </label>
        <textarea
          id="description"
          value={values.description}
          onChange={(e) => setFieldValue("description", e.target.value)}
          placeholder="Wprowadź szczegółowy opis sprzętu, stan, uwagi itd."
          rows={6}
          className={`w-full p-3 border rounded-xl resize-none focus:outline-none focus:ring-2 ${
            errors.description && touched.description
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />
        {touched.description && errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>
    </div>
  );
};

export default Description;
