import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from "react";
import type { GalleryItem } from '../../types/gallery';

interface Props {
  items: any[];
  index: number;
  onClose: () => void;
  setIndex: (i: number) => void;
}

export default function GalleryModal({
  items,
  index,
  onClose,
  setIndex,
}: Props) {

  const item = items[index];
  if (!item) return null;

  const next = () => {
    if (index < items.length - 1) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  /* Keyboard support */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">

      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white"
      >
        <X size={30} />
      </button>

      {/* PREV */}
      <button
        onClick={prev}
        disabled={index === 0}
        className="absolute left-5 text-white disabled:opacity-30"
      >
        <ChevronLeft size={40} />
      </button>

      {/* IMAGE */}
      <div className="max-w-5xl w-full px-6">
        <img
          src={item.image_url}
          className="w-full max-h-[85vh] object-contain rounded-2xl"
        />
      </div>

      {/* NEXT */}
      <button
        onClick={next}
        disabled={index === items.length - 1}
        className="absolute right-5 text-white disabled:opacity-30"
      >
        <ChevronRight size={40} />
      </button>

    </div>
  );
}