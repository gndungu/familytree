export default function SelectedPersonCard({
  person,
  darkMode,
}: any) {
  return (
    <div
      className={`rounded-2xl border p-4 backdrop-blur-xl ${
        darkMode
          ? "bg-slate-900/60 border-white/10"
          : "bg-white border-slate-200"
      }`}
    >
      <h3 className="font-semibold mb-3 text-indigo-400">
        Selected Person
      </h3>

      <div className="space-y-2 text-sm">
        <p><b>Name:</b> {person.name}</p>
        <p><b>Birth:</b> {person.birth}</p>
        <p><b>Gender:</b> {person.gender}</p>
        <p><b>Status:</b> {person.status}</p>
      </div>
    </div>
  );
}