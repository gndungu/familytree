import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../api/axios';
import type { Album } from '../types/gallery';
import TopBar from '../components/layout/TopBar';

export default function AlbumsPage() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);

  const [albums, setAlbums] = useState<Album[]>([]);

  const [loading, setLoading] = useState(true);

  const loadAlbums = async () => {
    try {
      const res = await api.get('/gallery/albums/');
      setAlbums(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  return (
    <div
      className={`min-h-screen transition ${
        darkMode
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white'
          : 'bg-slate-100 text-slate-900'
      }`}
    >

      <TopBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-4xl font-black">
              Albums
            </h1>

            <p className="text-slate-400 mt-2">
              Browse all gallery albums
            </p>
          </div>

        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : albums.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            No albums found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {albums.map((album) => (

              <div
                key={album.id}
                className={`group overflow-hidden rounded-3xl border transition hover:scale-[1.02] ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >

                <div className="relative h-64 overflow-hidden">

                  <img
                    src={album.cover || '/placeholder.jpg'}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">

                    <h2 className="text-2xl font-bold text-white line-clamp-1">
                      {album.title}
                    </h2>

                    <p className="text-sm text-slate-300 mt-1">
                       Photos
                    </p>

                  </div>

                </div>

                <div className="p-5">

                  <p
                    className={`text-sm line-clamp-3 ${
                      darkMode
                        ? 'text-slate-400'
                        : 'text-slate-600'
                    }`}
                  >
                    {album.description || 'No description'}
                  </p>

                  <button
                    onClick={() => navigate(`/gallery/${album.id}`)}
                    className="w-full mt-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold"
                  >
                    Open Album
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}