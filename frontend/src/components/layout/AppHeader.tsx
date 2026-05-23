import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;

  darkMode?: boolean;

  setDarkMode?: (value: boolean) => void;

  showBack?: boolean;

  backUrl?: string;

  rightContent?: ReactNode;
}

export default function AppHeader({
  title,
  darkMode = true,
  setDarkMode,
  showBack = false,
  backUrl,
  rightContent,
}: Props) {
  const navigate = useNavigate();

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 border-b backdrop-blur-xl ${
        darkMode
          ? "bg-slate-900/70 border-white/10 text-white"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">

        {showBack && (
          <button
            onClick={() =>
              backUrl ? navigate(backUrl) : navigate(-1)
            }
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
              darkMode
                ? "bg-slate-800 hover:bg-slate-700"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            ←
          </button>
        )}

        <div>
          <h1 className="text-lg md:text-xl font-bold text-indigo-400">
            {title}
          </h1>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">

        {rightContent}

        <button
          onClick={() => setDarkMode?.(!darkMode)}
          className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
            darkMode
              ? "bg-indigo-600 hover:bg-indigo-500 text-white"
              : "bg-slate-900 hover:bg-slate-800 text-white"
          }`}
        >
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}