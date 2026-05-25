import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import GalleryHeader from "../components/gallery/GalleryHeader";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryModal from "../components/gallery/GalleryModal";
import GalleryUploadModal from "../components/gallery/GalleryUploadModal";

import type { GalleryItem } from "../types/gallery";
import TopBar from "../components/layout/TopBar";
import GalleryUploadModalMultiple from "../components/gallery/GalleryUploadModalMultiple";
import ConfirmDialog from "../components/gallery/ConfirmDialog";

export default function GalleryPage() {

  const { id } = useParams();
  
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);
  
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [darkMode, setDarkMode] = useState(true);

  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const [selectedIndex, setSelectedIndex] =
  useState<number | null>(null);

  const [showUpload, setShowUpload] = useState(false);

  const [showUploadM, setShowUploadM] = useState(false);

  const [loading, setLoading] = useState(true);

  const [albums, setAlbums] = useState([]);

  const requestDelete = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const deleteImage = async () => {
    if (!deleteId) return;

    try {
      await api.delete(`/gallery/gallery/${deleteId}/`);

      setGallery((prev) =>
        prev.filter((img) => img.id !== deleteId)
      );

    } catch (err) {
      console.error(err);
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const load = async () => {
    const res = await api.get("/gallery/albums/");
    setAlbums(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  /* LOAD GALLERY */
  const loadGallery = async () => {
    try {
      const url = id
      ? `/gallery/gallery/?album=${id}`
      : "/gallery/gallery/";
      const res = await api.get(url);
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
          albums={albums}
          onClose={() => setShowUpload(false)}
          onUploaded={loadGallery}
        />
      )}

      {showUploadM && (
        <GalleryUploadModalMultiple
          darkMode={darkMode}
          albums={albums}
          onClose={() => setShowUploadM(false)}
          onUploaded={loadGallery}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-10">


        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mb-8">

          <button
            onClick={() => setShowUpload(true)}
            className="px-5 py-2.5 rounded-2xl bg-green-600 hover:bg-green-500 text-white transition"
          >
            Upload Photo
          </button>

          {/* <button
            onClick={() => setShowUploadM(true)}
            className="px-5 py-2.5 rounded-2xl bg-green-600 hover:bg-green-500 text-white transition"
          >
            Upload Photo Many
          </button> */}

          <button
            onClick={() => navigate(`/album/`)}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white transition"
          >
            Album
          </button>

          {/* <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button> */}

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-20">

            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />

          </div>
        ) : (
          // <GalleryGrid
          //   items={gallery}
          //   darkMode={darkMode}
          //   onSelect={setSelected}
          // />
          <GalleryGrid
            items={gallery}
            darkMode={darkMode}
            onSelect={(item) => {
              const index = gallery.findIndex(
                (g) => g.id === item.id
              );

              setSelectedIndex(index);
            }}
            onDelete={requestDelete}
          />
        )}

      </div>

      {/* IMAGE MODAL */}
      {selectedIndex !== null && (
        <GalleryModal
          items={gallery}
          index={selectedIndex}
          setIndex={setSelectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        darkMode={darkMode}
        title="Delete Image"
        message="This action cannot be undone. Do you want to continue?"
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
        onConfirm={deleteImage}
      />

    </div>
  );
}