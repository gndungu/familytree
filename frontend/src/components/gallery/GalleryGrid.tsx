import GalleryCard from './GalleryCard';
import type { GalleryItem } from '../../types/gallery';

interface Props {
  items: GalleryItem[];
  darkMode: boolean;
  onSelect: (item: GalleryItem) => void;
}

export default function GalleryGrid({
  items,
  darkMode,
  onSelect,
}: Props) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">

      {items.map((item) => (
        <GalleryCard
          key={item.id}
          item={item}
          darkMode={darkMode}
          onClick={() => onSelect(item)}
        />
      ))}
    </div>
  );
}