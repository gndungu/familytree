import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { FAMILY } from "../config/constants";
import TopBar from "../components/layout/TopBar";


interface Member {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  gender?: string;
  birth_date?: string;
  occupation?: string;
  profile_photo?: string;
  is_alive?: boolean;
}

export default function SearchMembers() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [members, setMembers] = useState<Member[]>([]);

  /* =========================
     SEARCH MEMBERS
  ========================= */
  const searchMembers = async (search = "") => {
    setLoading(true);

    try {
      const res = await api.get(
        `${FAMILY.MEMBERS}?search=${search}`
      );

      setMembers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INITIAL LOAD
  ========================= */
  useEffect(() => {
    searchMembers();
  }, []);

  /* =========================
     SEARCH INPUT
  ========================= */
  useEffect(() => {
    const timeout = setTimeout(() => {
      searchMembers(query);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  /* =========================
     THEME
  ========================= */
  const bg = darkMode
    ? "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white"
    : "bg-slate-100 text-slate-900";

  const card = darkMode
    ? "bg-slate-900/60 border-white/10"
    : "bg-white border-slate-200";

  const input = darkMode
    ? "bg-slate-800 text-white border-white/10"
    : "bg-white text-slate-900 border-slate-300";

  return (
    <div className={`min-h-screen ${bg} transition-all duration-300`}>

      {/* =========================
          TOP BAR
      ========================= */}
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* =========================
          CONTENT
      ========================= */}
      <div className="max-w-7xl mx-auto p-6">

        {/* SEARCH BAR */}
       <div
          className={`p-4 rounded-3xl border backdrop-blur-xl mb-6 ${card}`}
        >
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search by name, phone, occupation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={`flex-1 px-5 py-4 rounded-2xl border outline-none ${input}`}
            />

            <button
              onClick={() => navigate("/member/create/")}
              className="px-6 py-4 rounded-2xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              + Add
            </button>
          </div>
        </div>

        {/* RESULTS */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : members.length === 0 ? (

          <div
            className={`p-10 rounded-3xl border text-center ${card}`}
          >
            <p className="text-slate-400">
              No family members found
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {members.map((member) => (
              <div
                key={member.id} onClick={() =>
                        navigate(`/members/${member.id}`)
                      }
                className={`rounded-3xl border overflow-hidden backdrop-blur-xl transition hover:scale-[1.02] cursor-pointer ${card}`}
              >

                {/* IMAGE */}
                <div className="h-60 overflow-hidden bg-slate-800">
                  {member.profile_photo ? (
                    <img
                      src={member.profile_photo}
                      alt={member.first_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      👤
                    </div>
                  )}
                </div>

                {/* DETAILS */}
                <div className="p-5">

                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                      {member.first_name}{" "}
                      {member.middle_name}{" "}
                      {member.last_name}
                    </h2>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        member.is_alive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {member.is_alive ? "Alive" : "Deceased"}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-400">

                    {member.gender && (
                      <p>
                        <span className="text-white font-medium">
                          Gender:
                        </span>{" "}
                        {member.gender}
                      </p>
                    )}

                    {member.birth_date && (
                      <p>
                        <span className="text-white font-medium">
                          Born:
                        </span>{" "}
                        {member.birth_date}
                      </p>
                    )}

                    {member.occupation && (
                      <p>
                        <span className="text-white font-medium">
                          Occupation:
                        </span>{" "}
                        {member.occupation}
                      </p>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-2 mt-5">

                    <button
                      onClick={() =>
                        navigate(`/members/${member.id}`)
                      }
                      className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/members/edit/${member.id}`)
                      }
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700"
                    >
                      Edit
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}