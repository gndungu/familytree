export default function ActivityFeed({ darkMode }: any) {
  return (
    <div
      className={`flex-1 rounded-2xl border p-4 backdrop-blur-xl ${
        darkMode
          ? "bg-slate-900/60 border-white/10"
          : "bg-white border-slate-200"
      }`}
    >
      <h3 className="font-semibold mb-3 text-indigo-400">
        Recent Activity
      </h3>

      <ul className="space-y-2 text-sm text-slate-400">
        <li>✔ John Doe added</li>
        <li>✔ Marriage record updated</li>
        <li>✔ New child linked</li>
        <li>✔ Profile updated</li>
      </ul>
    </div>
  );
}