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
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const spec = values.specification;

  // Funkcja wyciągająca prefix przed pierwszą wielką literą
  const getGroup = (key: string) => {
    const match = key.match(/^[a-z]+/);
    return match ? match[0] : key;
  };

  // Grupujemy fieldy
  const grouped: Record<string, FieldDefinition[]> = {};
  fields.forEach((f) => {
    const group = getGroup(f.key);
    (grouped[group] ||= []).push(f);
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Specyfikacja</h2>

      <div className="space-y-6">
        {Object.entries(grouped).map(([group, groupFields]) => (
          <div key={group} className="flex flex-wrap gap-6">
            {groupFields.map((f) => {
              // ścieżka Formika
              const path = `specification.${f.key}`;
              // bieżąca wartość
              const value = spec[f.key] ?? "";
              // wartość, od której zależy to pole
              const depVal = f.dependsOn ? spec[f.dependsOn] : undefined;
              // opcje select
              const options =
                f.dependsOn && f.optionsMap
                  ? f.optionsMap[depVal] || []
                  : f.options || [];

              const onChange = (e: React.ChangeEvent<any>) => {
                setFieldValue(path, e.target.value);
                // jeśli to pole nie ma dependsOn, wyczyść wszystkie jego dzieci
                if (!f.dependsOn) {
                  (fields.filter((c) => c.dependsOn === f.key) || []).forEach(
                    (ch) => setFieldValue(`specification.${ch.key}`, "")
                  );
                }
              };

              return (
                <div key={f.key} className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    {f.label}
                  </label>

                  {f.type === "select" ? (
                    <select
                      name={path}
                      value={value}
                      onChange={onChange}
                      disabled={!!f.dependsOn && !depVal}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <option value="" disabled>
                        Wybierz {f.label.toLowerCase()}
                      </option>
                      {options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Field
                      name={path}
                      type={f.type}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specification;
