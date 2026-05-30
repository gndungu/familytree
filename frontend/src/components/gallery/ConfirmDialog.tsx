interface Props {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  darkMode: boolean;
}

export default function ConfirmDialog({
  open,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  onCancel,
  onConfirm,
  darkMode,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">

      <div
        className={`w-full max-w-md rounded-2xl p-6 shadow-xl ${
          darkMode ? "bg-slate-900 text-white" : "bg-white"
        }`}
      >

        <h2 className="text-xl font-bold mb-3 text-red-500">
          {title}
        </h2>

        <p className="text-sm text-slate-400 mb-6">
          {message}
        </p>

        <div className="flex gap-3">

          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl bg-slate-700 hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white"
          >
            Delete
          </button>

        </div>
      </div>

    </div>
  );
}