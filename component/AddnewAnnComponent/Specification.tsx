// src/component/AddnewAnnComponent/Specification.tsx
import React from "react";
import { useFormikContext, Field } from "formik";
import { FieldDefinition } from "../../../api/src/models/CategorySpec";

interface SpecProps {
  fields: FieldDefinition[];
}

interface FormValues {
  specification: Record<string, any>;
}

const Specification: React.FC<SpecProps> = ({ fields }) => {
  const { values } = useFormikContext<FormValues>();
  const spec = values.specification;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Specyfikacja</h2>

      <div className="space-y-6">
        {fields.map((f) => {
          const dependentValue = f.dependsOn ? spec[f.dependsOn] : undefined;
          const options =
            f.dependsOn && f.optionsMap
              ? f.optionsMap[dependentValue] || []
              : f.options || [];

          return (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                {f.label}
              </label>

              {f.type === "select" ? (
                <Field
                  as="select"
                  name={`specification.${f.key}`}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                  disabled={!!f.dependsOn && !dependentValue}
                  value={spec[f.key] ?? ""}
                >
                  <option value="" disabled>
                    Wybierz {f.label.toLowerCase()}
                  </option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Field>
              ) : (
                <Field
                  name={`specification.${f.key}`}
                  type={f.type}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Specification;
