import React, { useState, useRef, useEffect } from "react";
import { useFormikContext } from "formik";

const MAX_IMAGES = 6;

const ImagesUpload: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { setFieldValue, values } = useFormikContext<any>();
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (values.images && values.images.length > 0) {
      const files = values.images as File[];
      const filePreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews(filePreviews);

      return () => filePreviews.forEach((url) => URL.revokeObjectURL(url));
    } else {
      setPreviews([]);
    }
  }, [values.images]);

  const handleFiles = (files: FileList | File[]) => {
    const existing = values.images || [];
    const newFiles = Array.from(files).slice(0, MAX_IMAGES - existing.length);
    const total = [...existing, ...newFiles].slice(0, MAX_IMAGES);
    setFieldValue("images", total);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (index: number) => {
    const updated = [...values.images];
    updated.splice(index, 1);
    setFieldValue("images", updated);
  };

  return (
    <div className="max-w-6xl mx-auto mb-6">
      <label className="block font-medium text-gray-700 mb-2">
        Zdjęcia (max {MAX_IMAGES})
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className="w-full p-6 border-2 border-dashed border-gray-400 rounded-xl text-center text-gray-600 cursor-pointer hover:border-blue-500 transition mb-4"
      >
        <p className="mb-2 font-medium">
          Przeciągnij i upuść zdjęcia tutaj lub kliknij, aby wybrać
        </p>
        <p className="text-sm text-gray-400">
          (maksymalnie {MAX_IMAGES} plików)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files || [])}
          className="hidden"
        />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {previews.map((src, index) => (
            <div key={index} className="relative group">
              <img
                src={src}
                alt={`preview-${index}`}
                className="rounded-lg object-contain h-32 w-full border border-gray-300 bg-white"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagesUpload;
