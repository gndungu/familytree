import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { FAMILY } from "../config/constants";
import TopBar from "../components/layout/TopBar";
import { API_BASE_URL } from "../config/constants";

interface RelationMember {
  id: number;
  first_name: string;
  last_name?: string;
  profile_photo?: string;
}

interface Member {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  gender?: string;
  birth_date?: string;
  death_date?: string;
  place_of_birth?: string;
  occupation?: string;
  biography?: string;
  phone_number?: string;
  email?: string;
  profile_photo?: string;
  is_alive?: boolean;

  father?: RelationMember | null;
  mother?: RelationMember | null;
  spouse?: RelationMember | null;

  siblings?: RelationMember[];
  children?: RelationMember[];
}

export default function MemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<Member | null>(null);

  /* ================= LOAD ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`${FAMILY.MEMBERS}${id}/`);
        setMember(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) load();
  }, [id]);

  /* ================= THEME ================= */
  const bg = darkMode
    ? "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white"
    : "bg-slate-100 text-slate-900";

  const card = darkMode
    ? "bg-slate-900/60 border-white/10"
    : "bg-white border-slate-200";

  /* ================= RELATION CARD ================= */
  const RelationCard = ({ person, title }: any) => {
    if (!person) return null;

    return (
      <div
        onClick={() => navigate(`/members/${person.id}`)}
        className={`p-3 rounded-xl border cursor-pointer hover:scale-[1.01] transition ${card}`}
      >
        <div className="flex items-center gap-3">

          {person.profile_photo ? (
            <img
              src={`${API_BASE_URL}${person.profile_photo}`}
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-sm">
              👤
            </div>
          )}

          <div className="leading-tight">
            <p className="text-[10px] text-indigo-400">{title}</p>
            <p className="text-sm font-medium">
              {person.first_name} {person.last_name || ""}
            </p>
          </div>
        </div>
      </div>
    );
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bg}`}>
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bg}`}>
        <p>Member not found</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bg}`}>

      {/* ================= TOP BAR ================= */}
      <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto p-4 lg:p-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* ================= LEFT PROFILE ================= */}
          <div className="lg:sticky lg:top-4 h-fit">

            <div className={`rounded-2xl border shadow-xl overflow-hidden ${card}`}>

              {/* ================= PROFILE IMAGE BANNER ================= */}
              <div className="relative h-40 bg-slate-800 flex items-center justify-center">

                {/* subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/20 to-slate-900/60" />

                {member.profile_photo ? (
                  <img
                    src={member.profile_photo}
                    className="w-28 h-28 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-slate-900 shadow-2xl z-10"
                  />
                ) : (
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-slate-700 border-4 border-slate-900 flex items-center justify-center text-3xl shadow-2xl z-10">
                    👤
                  </div>
                )}
              </div>

              {/* ================= BODY ================= */}
              <div className="p-5">

                {/* NAME + STATUS */}
                <div className="text-center">

                  <h2 className="text-lg font-bold">
                    {member.first_name} {member.middle_name} {member.last_name}
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    {member.occupation || "No occupation recorded"}
                  </p>

                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium border ${
                        member.is_alive
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      {member.is_alive ? "● Alive" : "● Deceased"}
                    </span>
                  </div>
                </div>

                {/* ================= INFO GRID ================= */}
                <div className="mt-5 grid grid-cols-2 gap-2 text-xs">

                  <MiniInfo label="Gender" value={member.gender} />
                  <MiniInfo label="Birth" value={member.birth_date} />
                  <MiniInfo label="Phone" value={member.phone_number} />
                  <MiniInfo label="Email" value={member.email} />
                  <MiniInfo label="Birth Place" value={member.place_of_birth} />
                  <MiniInfo label="Death" value={member.death_date} />
                </div>

                {/* ================= BIO ================= */}
                {member.biography && (
                  <div className="mt-5">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">
                      Biography
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                      {member.biography}
                    </p>
                  </div>
                )}

                {/* ================= ACTIONS ================= */}
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => navigate(`/members/edit/${member.id}`)}
                    className="flex-1 py-2 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 py-2 text-xs rounded-xl bg-slate-800 hover:bg-slate-700"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => navigate(`/members/tree/${id}`)}
                    className="flex-1 py-2 text-xs rounded-xl bg-slate-800 hover:bg-slate-700"
                  >
                    Family Tree
                  </button>

                  
                </div>

              </div>
            </div>
          </div>

          

          {/* ================= RIGHT RELATIONS ================= */}
          <div className="lg:col-span-2 space-y-3">

            <Section title="Parents" card={card}>
              <div className="grid md:grid-cols-2 gap-2">
                <RelationCard person={member.father} title="Father" />
                <RelationCard person={member.mother} title="Mother" />
              </div>
            </Section>

            <Section title="Spouse" card={card}>
              <RelationCard person={member.spouse} title="Spouse" />
            </Section>

            <Section title="Children" card={card}>
              <div className="grid md:grid-cols-2 gap-2">
                {member.children?.length ? (
                  member.children.map((c) => (
                    <RelationCard key={c.id} person={c} title="Child" />
                  ))
                ) : (
                  <Empty />
                )}
              </div>
            </Section>

            <Section title="Siblings" card={card}>
              <div className="grid md:grid-cols-2 gap-2">
                {member.siblings?.length ? (
                  member.siblings.map((s) => (
                    <RelationCard key={s.id} person={s} title="Sibling" />
                  ))
                ) : (
                  <Empty />
                )}
              </div>
            </Section>

          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Section({ title, children, card }: any) {
  return (
    <div className={`p-4 rounded-2xl border ${card}`}>
      <h3 className="text-indigo-400 font-semibold mb-3 text-sm">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function Info({ label, value }: any) {
  return (
    <div className="flex justify-between border-b border-slate-700/20 pb-1">
      <span className="text-slate-400">{label}</span>
      <span>{value || "-"}</span>
    </div>
  );
}

function MiniInfo({ label, value }: any) {
  return (
    <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-700/20">
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="text-xs font-medium truncate">
        {value || "-"}
      </p>
    </div>
  );
}

function Empty() {
  return <p className="text-xs text-slate-500">No data</p>;
}