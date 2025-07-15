// src/components/ProductPage/ProductSpecs.tsx

import React from "react";
import { getLabel } from "../../utils/fieldLabels";

interface Props {
  spec: Record<string, any>;
}

const ProductSpecs: React.FC<Props> = ({ spec }) => (
  <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      <b>SPECYFIKACJA</b>
    </h3>
    <ul className="list-disc pl-5 text-sm text-gray-700">
      {Object.entries(spec).map(([key, value]) => (
        <li key={key} className="font-bold">
          {getLabel(key)}: {String(value)}
        </li>
      ))}
    </ul>
  </div>
);

export default ProductSpecs;
