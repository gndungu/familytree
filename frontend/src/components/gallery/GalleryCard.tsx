import type { GalleryItem } from '../../types/gallery';

interface Props {
  item: GalleryItem;
  darkMode: boolean;
  onClick: () => void;
}

export default function GalleryCard({
  item,
  darkMode,
  onClick,
}: Props) {
  
  return (
    <div
      onClick={onClick}
      className={`group overflow-hidden rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
        darkMode
          ? 'bg-slate-900/60 border-white/10'
          : 'bg-white border-slate-200'
      }`}
    >
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
          <p
            className={`text-sm line-clamp-2 ${
              darkMode
                ? 'text-slate-300'
                : 'text-slate-600'
            }`}
          >
            {item.description}
          </p>
        </div>
      )}
    </div>
  );
}