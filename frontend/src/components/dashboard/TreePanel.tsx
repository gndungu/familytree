export default function TreePanel({ darkMode }: any) {
  return (
    <div
      className={`flex-1 rounded-2xl border p-4 backdrop-blur-xl ${
        darkMode
          ? "bg-slate-900/60 border-white/10"
          : "bg-white border-slate-200"
      }`}
    >
      <h2 className="font-semibold mb-3 text-indigo-400">
        Family Tree
      </h2>

      <div className="h-[500px] flex items-center justify-center text-slate-400 border border-dashed rounded-xl">
        🌳 React Flow goes here
      </div>
    </div>
  );
}