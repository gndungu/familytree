export default function Section({ title, children, darkMode }: any) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        darkMode ? "bg-slate-900/60 border-white/10" : "bg-white"
      }`}
    >
      <h3 className="text-indigo-400 font-semibold mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}