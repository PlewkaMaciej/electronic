import React from "react";
import { useFormikContext } from "formik";
import { FormValues } from "../../src/AddnewAnn";

const Prize: React.FC = () => {
  const { values, setFieldValue, errors, touched, submitCount } =
    useFormikContext<FormValues>();

  const showPriceError = (touched.price || submitCount > 0) && errors.price;
  const showMinPriceError =
    values.negotiable &&
    (touched.minPrice || submitCount > 0) &&
    errors.minPrice;

  const handleNegotiableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("negotiable", e.target.checked);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Cena</h2>

      <div className="space-y-6">
        {/* Cena główna */}
        <div>
          <label className="block font-medium mb-1 text-gray-700">
            Podaj cenę
          </label>
          <input
            type="number"
            placeholder="np. 2500"
            value={values.price}
            onChange={(e) => setFieldValue("price", e.target.value)}
            className={`p-2 border rounded-xl w-full ${
              showPriceError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {showPriceError && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        {/* Komunikat o opłatach */}
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl border border-yellow-300">
          <p className="text-sm font-medium">
            <strong>Uwaga:</strong> przy sprzedaży online pobierzemy następujące
            opłaty:
          </p>
          <ul className="list-disc list-inside text-sm mt-2">
            <li>2% opłata transakcyjna</li>
            <li>3% opłata serwisowa</li>
          </ul>
        </div>

        {/* Przełącznik do negocjacji */}
        <div className="flex items-center justify-between">
          <label
            htmlFor="negotiable"
            className="text-sm font-medium text-gray-700"
          >
            Cena do negocjacji
          </label>
          <div className="relative">
            <input
              id="negotiable"
              type="checkbox"
              checked={values.negotiable}
              onChange={handleNegotiableChange}
              className="w-12 h-6 appearance-none bg-gray-300 rounded-full cursor-pointer transition-colors duration-300 ease-in-out checked:bg-green-500"
            />
            <span
              className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out pointer-events-none ${
                values.negotiable ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* Cena minimalna */}
        {values.negotiable && (
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Cena minimalna
            </label>
            <input
              type="number"
              placeholder="np. 2200"
              value={values.minPrice}
              onChange={(e) => setFieldValue("minPrice", e.target.value)}
              className={`p-2 border rounded-xl w-full ${
                showMinPriceError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showMinPriceError && (
              <p className="text-red-500 text-sm mt-1">{errors.minPrice}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prize;
