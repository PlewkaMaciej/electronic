import React from "react";
import { Field, useFormikContext } from "formik";
import type { FormValues } from "../../src/AddnewAnn";

const CategoryAnn: React.FC = () => {
  const { values, errors, touched } = useFormikContext<FormValues>();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Informacje ogólne
      </h2>

      <div className="space-y-6">
        {/* Kategoria sprzętu */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kategoria sprzętu
          </label>
          <Field
            as="select"
            id="category"
            name="category"
            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 ${
              errors.category && touched.category
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
          >
            <option value="" disabled hidden>
              Wybierz kategorię
            </option>
            <option value="Komputery stacjonarne">Komputery stacjonarne</option>
            <option value="Telefony">Telefony</option>
            {/* Dodaj kolejne kategorie jeśli trzeba */}
          </Field>
          {touched.category && errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* Tytuł ogłoszenia */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tytuł ogłoszenia
          </label>
          <Field
            id="title"
            name="title"
            type="text"
            placeholder="Wpisz tytuł..."
            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 ${
              errors.title && touched.title
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }`}
          />
          {touched.title && errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryAnn;
