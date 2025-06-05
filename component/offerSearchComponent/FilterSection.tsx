import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FilterSection({
  title,
  options,
  selected,
  onToggle,
  isExpandable = false,
  subOptions = [],
  onSubToggle,
  subSelected = [],
}: {
  title: string;
  options: string[];
  selected: string[]; // dla głównych opcji
  onToggle: (value: string) => void;
  isExpandable?: boolean;
  subOptions?: { brand: string; models: string[] }[];
  onSubToggle?: (value: string) => void;
  subSelected?: string[]; // dla sub-opcji (np. modeli GPU)
}) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full mb-2 font-semibold text-sm"
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="space-y-1">
          {options.map((option, idx) => (
            <div key={idx}>
              <label
                className={`flex items-center gap-2 text-sm cursor-pointer rounded px-2 py-1 transition ${
                  selected.includes(option)
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => onToggle(option)}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  readOnly
                  className="accent-indigo-600"
                />
                {option}
              </label>

              {selected.includes(option) &&
                isExpandable &&
                subOptions.length > 0 &&
                subOptions.find((s) => s.brand === option) && (
                  <div className="pl-4">
                    {subOptions
                      .find((s) => s.brand === option)!
                      .models.map((subOption, subIdx) => (
                        <label
                          key={subIdx}
                          className="flex items-center gap-2 text-sm cursor-pointer rounded px-2 py-1 transition hover:bg-gray-100"
                          onClick={() => onSubToggle?.(subOption)}
                        >
                          <input
                            type="checkbox"
                            checked={subSelected?.includes(subOption) || false}
                            readOnly
                            className="accent-indigo-600"
                          />
                          {subOption}
                        </label>
                      ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
