import { useNavigate } from "react-router-dom";

export default function TopBar({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}) {
  
  const navigate = useNavigate();

  return (
    <header
  className={`flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl ${
    darkMode
      ? "border-white/10 bg-slate-900/40 text-white"
      : "border-slate-200 bg-white text-slate-900"
  }`}
>

  {/* LEFT */}
  <div className="flex items-center">
    <h1 className="text-xl font-bold text-indigo-400">
      FamilyTree
    </h1>
  </div>

  {/* CENTER MENU */}
  <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">

    <button
      onClick={() => navigate("/dashboard")}
      className={`text-sm font-medium transition hover:text-indigo-400 ${
        darkMode
          ? "text-slate-300"
          : "text-slate-700"
      }`}
    >
      Home
    </button>

    <button
      onClick={() => navigate("/search/member")}
      className={`text-sm font-medium transition hover:text-indigo-400 ${
        darkMode
          ? "text-slate-300"
          : "text-slate-700"
      }`}
    >
      Find Family
    </button>

    <button
      onClick={() => navigate("/gallery")}
      className={`text-sm font-medium transition hover:text-indigo-400 ${
        darkMode
          ? "text-slate-300"
          : "text-slate-700"
      }`}
    >
      Gallery
    </button>

  </nav>

  {/* RIGHT */}
  <div className="flex items-center gap-3">

    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition"
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>

  </div>
</header>
  );
}