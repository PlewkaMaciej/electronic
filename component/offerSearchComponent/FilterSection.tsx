import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FilterSection({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
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
            <label
              key={idx}
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
          ))}
        </div>
      )}
    </div>
  );
}
