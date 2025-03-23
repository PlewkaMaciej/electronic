import React from "react";
import { CircleAlert, CheckCircle2 } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
}

const StyleInput: React.FC<InputProps> = ({ label, error, success, icon, className, ...props }) => {
  return (
    <div className="w-full">
      {label && <label className="block text-gray-700 font-medium mb-1">{label}</label>}
      
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
        
        <input
          className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none transition 
            focus:ring-2 focus:ring-[#339FB8] focus:border-[#339FB8]
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${icon ? "pl-10" : ""}
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
            ${success ? "border-green-500 focus:ring-green-500" : ""}
            ${className || ""}`}
          {...props}
        />

        {error && <CircleAlert className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" />}
        {success && !error && <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default StyleInput
