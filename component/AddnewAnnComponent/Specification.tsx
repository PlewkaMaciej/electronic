// src/component/AddnewAnnComponent/Specification.tsx
import React from "react";
import { useFormikContext, Field } from "formik";
import { getLabel } from "../../utils/fieldLabels";

interface FieldDefinition {
  key: string;
  label: string; // już nie używamy bezpośrednio
  type: "text" | "select" | "number" | "boolean";
  options?: string[];
  dependsOn?: string;
  optionsMap?: Record<string, string[]>;
}
interface SpecProps {
  fields: FieldDefinition[];
}
interface FormValues {
  specification: Record<string, any>;
}

const Specification: React.FC<SpecProps> = ({ fields }) => {
  const { values, setFieldValue, submitCount } = useFormikContext<FormValues>();
  const spec = values.specification || {};

  // Grupowanie po prefiksie
  const getGroup = (key: string) => (key.match(/^[a-z]+/) ?? [key])[0];
  const grouped: Record<string, FieldDefinition[]> = {};
  fields.forEach((f) => {
    const g = getGroup(f.key);
    (grouped[g] ||= []).push(f);
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Specyfikacja</h2>
      <div className="space-y-6">
        {Object.entries(grouped).map(([group, groupFields]) => (
          <div key={group} className="flex flex-wrap gap-6">
            {groupFields.map((f) => {
              const path = `specification.${f.key}`;
              const val = spec[f.key] ?? "";
              const depVal = f.dependsOn ? spec[f.dependsOn] : undefined;
              const opts =
                f.dependsOn && f.optionsMap
                  ? f.optionsMap[depVal] || []
                  : f.options || [];

              const showError = submitCount > 0 && !val;
              const cls = `w-full p-3 border rounded-xl focus:outline-none focus:ring-2 ${
                showError
                  ? "border-red-500 ring-red-300"
                  : "border-gray-300 ring-blue-300"
              }`;

              // Pobieramy etykietę z naszego modułu
              const labelText = getLabel(f.key);

              if (f.type === "boolean") {
                return (
                  <div
                    key={f.key}
                    className="flex-1 min-w-[200px] flex items-center gap-2"
                  >
                    <Field
                      type="checkbox"
                      name={path}
                      checked={val === true}
                      onChange={(e: any) =>
                        setFieldValue(path, e.target.checked)
                      }
                      className="w-5 h-5 rounded"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      {labelText}
                    </label>
                  </div>
                );
              }

              return (
                <div key={f.key} className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    {labelText}
                  </label>
                  {f.type === "select" ? (
                    <>
                      <select
                        name={path}
                        value={val}
                        onChange={(e) => {
                          setFieldValue(path, e.target.value);
                          if (!f.dependsOn) {
                            fields
                              .filter((c) => c.dependsOn === f.key)
                              .forEach((ch) =>
                                setFieldValue(`specification.${ch.key}`, "")
                              );
                          }
                        }}
                        disabled={!!f.dependsOn && !depVal}
                        className={cls}
                      >
                        <option value="" disabled>
                          Wybierz {labelText.toLowerCase()}
                        </option>
                        {opts.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      {showError && (
                        <p className="text-red-500 text-sm mt-1">
                          To pole jest wymagane
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      <Field name={path} type={f.type} className={cls} />
                      {showError && (
                        <p className="text-red-500 text-sm mt-1">
                          To pole jest wymagane
                        </p>
                      )}
                    </>
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
