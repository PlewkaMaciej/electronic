import React from "react";

interface Props {
  spec: Record<string, any>;
}

const ProductSpecs: React.FC<Props> = ({ spec }) => (
  <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      <b>SPECYFIKACJA</b>
    </h3>
    <ul className="list-disc pl-5 text-sm text-gray-700">
      {Object.entries(spec).map(([k, v]) => (
        <li key={k} className="font-bold">
          {k.charAt(0).toUpperCase() + k.slice(1)}: {String(v)}
        </li>
      ))}
    </ul>
  </div>
);

export default ProductSpecs;
