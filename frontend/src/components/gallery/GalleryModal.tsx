import { X } from 'lucide-react';
import type { GalleryItem } from '../../types/gallery';

interface Props {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function GalleryModal({
  item,
  onClose,
}: Props) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="relative max-w-5xl w-full">

        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white"
        >
          <X size={28} />
        </button>

        <img
          src={item.image}
          alt={item.title}
          className="w-full max-h-[85vh] object-contain rounded-3xl"
        />

        <div className="mt-4 text-white">
          <h2 className="text-2xl font-bold">
            {item.title}
          </h2>

          {item.description && (
            <p className="mt-2 text-slate-300">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}