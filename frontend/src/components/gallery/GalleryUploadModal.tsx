import { useState } from "react";
import api from "../../api/axios";

interface Props {
  darkMode: boolean;
  onClose: () => void;
  onUploaded: () => void;
}

export default function GalleryUploadModal({
  darkMode,
  onClose,
  onUploaded,
}: Props) {
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [eventDate, setEventDate] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const submit = async () => {
    if (!title || !image) {
      alert("Title and image required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("event_date", eventDate);
      formData.append("image", image);

      await api.post("/gallery/gallery/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onUploaded();

      onClose();

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div
        className={`w-full max-w-xl rounded-3xl border shadow-2xl p-6 ${
          darkMode
            ? "bg-slate-900 border-white/10 text-white"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-indigo-400">
            Upload Memory
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        {/* IMAGE PREVIEW */}
        <div className="mb-5">

          {preview ? (
            <img
              src={preview}
              className="w-full h-64 object-cover rounded-2xl border border-white/10"
            />
          ) : (
            <div
              className={`h-64 rounded-2xl border-2 border-dashed flex items-center justify-center ${
                darkMode
                  ? "border-white/10 bg-slate-800"
                  : "border-slate-300 bg-slate-100"
              }`}
            >
              <span className="text-slate-400">
                Image Preview
              </span>
            </div>
          )}
        </div>

        {/* FILE INPUT */}
        <label
          className={`mb-4 flex items-center justify-center h-14 rounded-2xl border-2 border-dashed cursor-pointer transition ${
            darkMode
              ? "border-indigo-500/30 hover:border-indigo-500 bg-slate-800"
              : "border-indigo-300 hover:border-indigo-500 bg-slate-50"
          }`}
        >
          <span className="text-sm font-medium">
            Select Image
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </label>

        {/* TITLE */}
        <div className="mb-4">
          <label className="text-sm text-slate-400">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className={`mt-2 w-full px-4 py-3 rounded-2xl border outline-none ${
              darkMode
                ? "bg-slate-800 border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">
          <label className="text-sm text-slate-400">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={4}
            className={`mt-2 w-full px-4 py-3 rounded-2xl border outline-none ${
              darkMode
                ? "bg-slate-800 border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}
          />
        </div>

        {/* EVENT DATE */}
        <div className="mb-6">
          <label className="text-sm text-slate-400">
            Event Date
          </label>

          <input
            type="date"
            value={eventDate}
            onChange={(e) =>
              setEventDate(e.target.value)
            }
            className={`mt-2 w-full px-4 py-3 rounded-2xl border outline-none ${
              darkMode
                ? "bg-slate-800 border-white/10"
                : "bg-slate-50 border-slate-200"
            }`}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">

          <button
            onClick={onClose}
            className={`flex-1 py-3 rounded-2xl ${
              darkMode
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-slate-200 hover:bg-slate-300"
            }`}
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            {loading
              ? "Uploading..."
              : "Upload"}
          </button>

        </div>
      </div>
    </div>
  );
}