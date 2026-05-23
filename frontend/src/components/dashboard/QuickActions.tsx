import { useNavigate } from "react-router-dom";

export default function QuickActions({ darkMode }: any) {
  const navigate = useNavigate();

  return (
    <div
      className={`rounded-2xl border p-4 backdrop-blur-xl ${
        darkMode
          ? "bg-slate-900/60 border-white/10"
          : "bg-white border-slate-200"
      }`}
    >
      <h3 className="font-semibold mb-3 text-indigo-400">
        Quick Actions
      </h3>

      <div className="space-y-2">
        <button
          onClick={() => navigate("/member/create/")}
          className="w-full py-2 bg-indigo-600 rounded-xl"
        >
          Add Member
        </button>

        <button className="w-full py-2 bg-slate-800/60 rounded-xl">
          Import Data
        </button>

        <button className="w-full py-2 bg-slate-800/60 rounded-xl">
          View Reports
        </button>
      </div>
    </div>
  );
}