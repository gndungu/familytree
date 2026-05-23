import { useEffect, useState } from "react";

import api from "../api/axios";

import GalleryHeader from "../components/gallery/GalleryHeader";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryModal from "../components/gallery/GalleryModal";
import GalleryUploadModal from "../components/gallery/GalleryUploadModal";

import type { GalleryItem } from "../types/gallery";
import TopBar from "../components/layout/TopBar";

export default function GalleryPage() {

  const [darkMode, setDarkMode] = useState(true);

  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const [selected, setSelected] =
    useState<GalleryItem | null>(null);

  const [showUpload, setShowUpload] =
    useState(false);

  const [loading, setLoading] = useState(true);

  /* LOAD GALLERY */
  const loadGallery = async () => {
    try {
      const res = await api.get("/gallery/gallery/");

      setGallery(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <div
      className={`min-h-screen transition ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <TopBar
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />

      {/* UPLOAD MODAL */}
      {showUpload && (
        <GalleryUploadModal
          darkMode={darkMode}
          onClose={() => setShowUpload(false)}
          onUploaded={loadGallery}
        />
      )}

      <div    className="max-w-7xl mx-auto px-4 py-10">


        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mb-8">

          <button
            onClick={() => setShowUpload(true)}
            className="px-5 py-2.5 rounded-2xl bg-green-600 hover:bg-green-500 text-white transition"
          >
            Upload Photo
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-20">

            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />

          </div>
        ) : (
          <GalleryGrid
            items={gallery}
            darkMode={darkMode}
            onSelect={setSelected}
          />
        )}

      </div>

      {/* IMAGE MODAL */}
      <GalleryModal
        item={selected}
        onClose={() => setSelected(null)}
      />

    </div>
  );
}