export default function Info({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm border-b border-slate-700/30 pb-1">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  );
}