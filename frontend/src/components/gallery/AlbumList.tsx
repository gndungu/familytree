import type { Album } from "../../types/gallery";
import GalleryGrid from "./GalleryGrid";

interface Props {
  albums: Album[];
  darkMode: boolean;
  onSelect: (item: any) => void;
}

export default function AlbumList({
  albums,
  darkMode,
  onSelect,
}: Props) {
  return (
    <div className="space-y-10">

      {albums.map((album) => (
        <div key={album.id}>

          <h2 className="text-2xl font-bold text-indigo-400 mb-4">
            {album.title}
          </h2>

          <GalleryGrid
            items={album.photos}
            darkMode={darkMode}
            onSelect={onSelect}
          />

        </div>
      ))}

    </div>
  );
}