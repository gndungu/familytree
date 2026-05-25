import type { GalleryItem } from '../../types/gallery';

interface Props {
  item: GalleryItem;
  darkMode: boolean;
  onClick: () => void;
  onDelete?: (id: number) => void;
}

export default function GalleryCard({
  item,
  darkMode,
  onClick,
  onDelete,
}: Props) {

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
        darkMode
          ? 'bg-slate-900/60 border-white/10'
          : 'bg-white border-slate-200'
      }`}
    >

      {/* DELETE BUTTON */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent opening modal
            onDelete(item.id);
          }}
          className="absolute top-2 right-2 z-10 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
        >
          Delete
        </button>
      )}

      <div className="relative overflow-hidden">

        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-32 object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 p-4 text-white">

          <h3 className="font-semibold text-lg">
            {item.title}
          </h3>

          {item.event_date && (
            <p className="text-xs text-slate-200 mt-1">
              {item.event_date}
            </p>
          )}
        </div>
      </div>

      {item.description && (
        <div className="p-4">
          <p className={`text-sm line-clamp-2 ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {item.description}
          </p>
        </div>
      )}

    </div>
  );
}