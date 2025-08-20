import React, { useEffect, useRef, useState } from "react";

interface Props {
  existingImages: string[];
  onExistingChange: (arr: string[]) => void;
  onNewFilesChange: (files: File[]) => void;
  maxImages?: number;
}

const MAX = 6;

const ImagesUploadEdit: React.FC<Props> = ({
  existingImages,
  onExistingChange,
  onNewFilesChange,
  maxImages = MAX,
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [existing, setExisting] = useState<string[]>(existingImages || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    setExisting(existingImages || []);
  }, [existingImages]);

  useEffect(() => {
    const urls = newFiles.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [newFiles]);

  useEffect(() => {
    onExistingChange(existing);
  }, [existing, onExistingChange]);

  useEffect(() => {
    onNewFilesChange(newFiles);
  }, [newFiles, onNewFilesChange]);

  const handleFiles = (files: FileList | File[]) => {
    const arr = Array.from(files);
    const allowed = Math.max(0, maxImages - existing.length - newFiles.length);
    const toAdd = arr.slice(0, allowed);
    setNewFiles((s) => [...s, ...toAdd]);
  };

  const removeExisting = (idx: number) => {
    const copy = [...existing];
    copy.splice(idx, 1);
    setExisting(copy);
  };

  const removeNew = (idx: number) => {
    const copy = [...newFiles];
    copy.splice(idx, 1);
    setNewFiles(copy);
  };

  const openFile = () => fileRef.current?.click();

  return (
    <div className="max-w-6xl mx-auto mb-6">
      <label className="block font-medium text-gray-700 mb-2">
        Zdjęcia (max {maxImages})
      </label>

      <div
        onClick={openFile}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        className="w-full p-6 border-2 border-dashed border-gray-400 rounded-xl text-center text-gray-600 cursor-pointer hover:border-blue-500 transition mb-4"
      >
        <p className="mb-2 font-medium">
          Przeciągnij i upuść zdjęcia tutaj lub kliknij, aby wybrać
        </p>
        <p className="text-sm text-gray-400">
          (możesz dodać nowe zdjęcia, usuwać istniejące)
        </p>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files || [])}
        />
      </div>

      {existing.length > 0 && (
        <>
          <p className="mb-2 font-medium">Istniejące zdjęcia</p>
          <div className="flex gap-3 flex-wrap mb-4">
            {existing.map((url, i) => (
              <div
                key={i}
                className="relative w-28 h-28 rounded overflow-hidden border border-gray-300"
              >
                <img
                  src={url}
                  alt={`existing-${i}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeExisting(i);
                  }}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {previews.length > 0 && (
        <>
          <p className="mb-2 font-medium">Nowe pliki</p>
          <div className="flex gap-3 flex-wrap mb-4">
            {previews.map((src, i) => (
              <div
                key={i}
                className="relative w-28 h-28 rounded overflow-hidden border border-gray-300"
              >
                <img
                  src={src}
                  alt={`new-${i}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNew(i);
                  }}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  type="button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="text-sm text-gray-500">
        Zdjęć łącznie: {existing.length + newFiles.length} / {maxImages}
      </p>
    </div>
  );
};

export default ImagesUploadEdit;
