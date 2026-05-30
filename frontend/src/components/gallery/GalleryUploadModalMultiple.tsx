import { useState } from "react";
import api from "../../api/axios";
import CreateAlbumModal from "../../pages/CreateAlbumModal";

interface Props {
  darkMode: boolean;
  albums: any[];
  onClose: () => void;
  onUploaded: () => void;
}

export default function GalleryUploadModalMultiple({
  darkMode,
  albums,
  onClose,
  onUploaded,
}: Props) {
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [album, setAlbum] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setImages(Array.from(files));
  };

  const submit = async () => {
    const formData = new FormData();

    formData.append("album", album);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      setLoading(true);

      await api.post("/gallery/gallerym/", formData);

      onUploaded();
      onClose();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-50 inset-0 bg-black/70 flex items-center justify-center p-4">

      {showAlbumModal && (
        <CreateAlbumModal
          darkMode={darkMode}
          onClose={() => setShowAlbumModal(false)}
          onCreated={() => {
            setShowAlbumModal(false);
            // optionally refresh albums list
          }}
        />
      )}

      <div className={`w-full max-w-xl p-6 rounded-2xl ${
        darkMode ? "bg-slate-900 text-white" : "bg-white"
      }`}>

        <h2 className="text-xl font-bold text-indigo-400 mb-4">
          Upload Photos
        </h2>

        {/* ALBUM SELECT */}
        <select
          value={album}
          onChange={(e) => {
            const value = e.target.value;

            if (value === "__create__") {
              setShowAlbumModal(true);
              return;
            }

            setAlbum(value);
          }}
          className="w-full p-3 rounded-xl bg-slate-800 mb-4"
        >
          <option value="">Select Album</option>

          {albums.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
            </option>
          ))}

          <option value="__create__">
            + Create new album
          </option>
        </select>

        {/* FILE INPUT */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImages}
          className="mb-4"
        />

        {/* ACTIONS */}
        <div className="flex gap-3">

          <button
            onClick={onClose}
            className="flex-1 p-3 bg-slate-700 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 p-3 bg-indigo-600 rounded-xl text-white"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

        </div>

      </div>

    </div>
  );
}