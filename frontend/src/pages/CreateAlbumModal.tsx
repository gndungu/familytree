import { useState } from "react";
import api from "../api/axios";

interface Props {
  darkMode: boolean;
  onClose: () => void;
  onCreated: (album: any) => void;
}

export default function CreateAlbumModal({
  darkMode,
  onClose,
  onCreated,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", name);
      formData.append("description", description);

      if (cover) {
        formData.append("cover", cover);
      }

      const res = await api.post("/gallery/albums/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // return created album to parent
      onCreated(res.data);

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-lg rounded-2xl p-6 ${
          darkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
        }`}
      >
        <h2 className="text-xl font-bold mb-4 text-indigo-400">
          Create Album
        </h2>

        {/* NAME */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Album name"
          className="w-full p-3 rounded-xl bg-slate-800 mb-3 outline-none"
        />

        {/* DESCRIPTION */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-3 rounded-xl bg-slate-800 mb-3 outline-none min-h-[100px]"
        />

        {/* COVER IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setCover(e.target.files[0]);
            }
          }}
          className="mb-4"
        />

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 p-3 rounded-xl bg-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 p-3 rounded-xl bg-indigo-600 text-white"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}