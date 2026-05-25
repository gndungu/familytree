import { useRef, useState, useMemo } from "react";
import api from "../../api/axios";
import CreateAlbumModal from "../../pages/CreateAlbumModal";

interface Props {
  darkMode: boolean;
  albums: any[];
  onClose: () => void;
  onUploaded: () => void;
  onRefreshAlbums?: () => void;
}

export default function GalleryUploadModal({
  darkMode,
  albums,
  onClose,
  onUploaded,
  onRefreshAlbums,
}: Props) {

  const [album, setAlbum] = useState("");
  const [albumOpen, setAlbumOpen] = useState(false);
  const [albumQuery, setAlbumQuery] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const [showAlbumModal, setShowAlbumModal] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);

  // -------------------------
  // FILTER ALBUMS (SEARCH)
  // -------------------------
  const filteredAlbums = useMemo(() => {
    return albums.filter((a) =>
      a.title.toLowerCase().includes(albumQuery.toLowerCase())
    );
  }, [albums, albumQuery]);

  const selectedAlbum = albums.find((a) => a.id.toString() === album);

  // -------------------------
  // FILE HANDLING
  // -------------------------
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setImages((prev) => [...prev, ...Array.from(files)]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // -------------------------
  // SUBMIT
  // -------------------------
  const submit = async () => {
    if (images.length === 0) {
      alert("Select images first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      if (album) {
        formData.append("album", album);
      }

      images.forEach((img) => {
        formData.append("images", img);
      });

      await api.post("/gallery/gallerym/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onUploaded();
      onClose();

    } catch (err: any) {
      console.error(err.response?.data || err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">

      <div className={`w-full max-w-2xl p-6 rounded-2xl ${
        darkMode ? "bg-slate-900 text-white" : "bg-white"
      }`}>

        {/* TITLE */}
        <h2 className="text-xl font-bold text-indigo-400 mb-4">
          Upload Photos
        </h2>

        {/* -------------------------
            ALBUM DROPDOWN
        ------------------------- */}
        <div className="relative mb-4">

          <div
            onClick={() => setAlbumOpen(!albumOpen)}
            className={`p-3 rounded-xl border cursor-pointer ${
              darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-300"
            }`}
          >
            {selectedAlbum ? selectedAlbum.name : "Select Album"}
          </div>

          {albumOpen && (
            <div className={`absolute z-50 w-full mt-2 rounded-xl border max-h-64 overflow-auto ${
              darkMode
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-300"
            }`}>

              {/* SEARCH */}
              <input
                value={albumQuery}
                onChange={(e) => setAlbumQuery(e.target.value)}
                placeholder="Search album..."
                className="w-full p-3 border-b outline-none bg-transparent"
              />

              {/* CREATE NEW */}
              <div
                onClick={() => {
                  setShowAlbumModal(true);
                  setAlbumOpen(false);
                }}
                className="p-3 text-indigo-400 cursor-pointer hover:bg-slate-700"
              >
                + Create new album
              </div>

              {/* LIST */}
              {filteredAlbums.length === 0 ? (
                <div className="p-3 text-slate-400">
                  No albums found
                </div>
              ) : (
                filteredAlbums.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      setAlbum(a.id.toString());
                      setAlbumOpen(false);
                      setAlbumQuery("");
                    }}
                    className="p-3 cursor-pointer hover:bg-slate-700"
                  >
                    {a.title}
                  </div>
                ))
              )}

            </div>
          )}
        </div>

        {/* -------------------------
            DRAG & DROP
        ------------------------- */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer mb-4 ${
            darkMode
              ? "border-slate-700 bg-slate-800"
              : "border-slate-300 bg-slate-50"
          }`}
        >
          Drag & drop images or click to select

          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* -------------------------
            PREVIEW
        ------------------------- */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-4 max-h-60 overflow-auto">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  className="w-full h-24 object-cover rounded-xl"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

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
            className="flex-1 p-3 bg-indigo-600 text-white rounded-xl"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

      </div>

      {/* CREATE ALBUM MODAL */}
      {showAlbumModal && (
        <CreateAlbumModal
          darkMode={darkMode}
          onClose={() => setShowAlbumModal(false)}
          onCreated={(newAlbum) => {
            setShowAlbumModal(false);
            setAlbum(newAlbum.id.toString());
            onRefreshAlbums?.();
          }}
        />
      )}

    </div>
  );
}