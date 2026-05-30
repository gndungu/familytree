import { useState, useEffect } from "react";
import TopBar from "../components/layout/TopBar";
import StatCard from "../components/dashboard/StatCard";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import TreePanel from "../components/dashboard/TreePanel";
import api from "../api/axios";
import { FAMILY } from "../config/constants";

interface MemberStatistics {
  total_members: number,
  total_generations: number,
  living_members: number,
  deceased_members: number
}

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [member_stats, setMemberStats] = useState<MemberStatistics | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`${FAMILY.STATS}`);
        setMemberStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        <StatCard label="Members" value={member_stats?.total_members} darkMode={darkMode} url="/search/member"/>
        <StatCard label="Generations" value={member_stats?.total_generations} darkMode={darkMode} />
        <StatCard label="Living" value={member_stats?.living_members} darkMode={darkMode} />
        <StatCard label="Deceased" value={member_stats?.deceased_members} darkMode={darkMode} />
      </div>

      {/* MAIN */}
      <div className="flex flex-1 gap-4 px-6 pb-6">
        <TreePanel darkMode={darkMode} />

        <div className="w-80 flex flex-col gap-4">
          <QuickActions darkMode={darkMode} />
          <ActivityFeed darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}