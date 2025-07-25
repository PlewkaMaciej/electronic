import React from "react";

interface DeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onCancel,
  onConfirm,
  loading = false,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Usuń ogłoszenie</h2>
        <p className="text-gray-600 mb-6">
          Czy na pewno chcesz usunąć to ogłoszenie?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Anuluj
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {loading ? "Usuwanie…" : "Usuń"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
