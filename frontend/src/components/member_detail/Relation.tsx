export default function Relation({ label, person }: any) {
  if (!person) {
    return <p className="text-sm text-slate-500">{label}: None</p>;
  }

  return (
    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40">
      <div>
        <p className="text-sm font-medium">
          {person.first_name} {person.last_name}
        </p>
        <p className="text-xs text-slate-400">{label}</p>
      </div>
    </div>
  );
}