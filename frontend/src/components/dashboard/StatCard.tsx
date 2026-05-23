import { useNavigate } from "react-router-dom";


export default function StatCard({
  label,
  value,
  darkMode,
  url,
}: any) {
    const navigate = useNavigate();
  return (
    <div
        onClick={() => navigate(url)}
      className={`p-5 rounded-2xl border backdrop-blur-xl hover:scale-[1.02] cursor-pointer ${
        darkMode
          ? "bg-slate-900/60 border-white/10"
          : "bg-white border-slate-200"
      }`}
    >
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-indigo-400">{value}</p>
    </div>
  );
}