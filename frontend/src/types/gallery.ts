export interface GalleryItem {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  event_date?: string;
  created_at: string;
}

export interface Album {
  id: number;
  title: string;
  description?: string;
  cover: string;
  photos: GalleryItem[];
}

interface Props {
  items: any[];
  index: number;
  onClose: () => void;
  setIndex: (i: number) => void;
}