import GalleryCard from './GalleryCard';
import type { GalleryItem } from '../../types/gallery';

interface Props {
  items: GalleryItem[];
  darkMode: boolean;
  onSelect: (item: GalleryItem) => void;
  onDelete?: (id: number) => void;
}

export default function GalleryGrid({
  items,
  darkMode,
  onSelect,
  onDelete
}: Props) {
  return (
    <div className="s:column-1 columns-2 sm:columns-2 md:columns-3 lg:columns-5 gap-5 space-y-5">

      {items.map((item) => (
        <GalleryCard
          key={item.id}
          item={item}
          darkMode={darkMode}
          onClick={() => onSelect(item)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}