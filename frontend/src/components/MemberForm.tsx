import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AsyncSelect from "react-select/async";
import TopBar from "./layout/TopBar";

type Props = {
  mode?: "create" | "edit";
  memberId?: string;
};

export default function MemberForm({ mode = "create", memberId }: Props) {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [selectedFather, setSelectedFather] = useState<any>(null);
  const [selectedMother, setSelectedMother] = useState<any>(null);
  const [selectedSpouse, setSelectedSpouse] = useState<any>(null);

  const [form, setForm] = useState<any>({
    tree: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    birth_date: "",
    death_date: "",
    place_of_birth: "",
    occupation: "",
    biography: "",
    phone_number: "",
    email: "",
    father: null,
    mother: null,
    spouse: null,
    is_alive: true,
  });

  /* =========================
     LOAD MEMBER (EDIT MODE)
  ========================= */
  useEffect(() => {
    if (mode === "edit" && memberId) {
      api.get(`/family/members/${memberId}/`).then((res) => {
        const data = res.data;

        setForm({
          tree: data.tree?.id || data.tree,
          first_name: data.first_name || "",
          middle_name: data.middle_name || "",
          last_name: data.last_name || "",
          gender: data.gender || "",
          birth_date: data.birth_date || "",
          death_date: data.death_date || "",
          place_of_birth: data.place_of_birth || "",
          occupation: data.occupation || "",
          biography: data.biography || "",
          phone_number: data.phone_number || "",
          email: data.email || "",
          father: data.father || null,
          mother: data.mother || null,
          spouse: data.spouse || null,
          is_alive: data.is_alive ?? true,
        });

        setPreview(data.profile_photo || null);
      });
    }
  }, [mode, memberId]);


  

  /* =========================
     LOADERS
  ========================= */

  useEffect(() => {
  if (!memberId) return; // CREATE MODE → skip

  const loadMember = async () => {
    const res = await api.get(`/family/members/${memberId}/`);
    const member = res.data;

    setForm({
      tree: member.tree,
      first_name: member.first_name,
      middle_name: member.middle_name || "",
      last_name: member.last_name || "",
      gender: member.gender || "",
      birth_date: member.birth_date || "",
      death_date: member.death_date || "",
      place_of_birth: member.place_of_birth || "",
      occupation: member.occupation || "",
      biography: member.biography || "",
      phone_number: member.phone_number || "",
      email: member.email || "",
      father: member.father?.id || null,
      mother: member.mother?.id || null,
      spouse: member.spouse?.id || null,
      is_alive: member.is_alive,
    });

    setSelectedFather(
      member.father
        ? {
            value: member.father.id,
            label: `${member.father.first_name} ${member.father.last_name || ""}`,
          }
        : null
    );

    setSelectedMother(
      member.mother
        ? {
            value: member.mother.id,
            label: `${member.mother.first_name} ${member.mother.last_name || ""}`,
          }
        : null
    );

    setSelectedSpouse(
      member.spouse
        ? {
            value: member.spouse.id,
            label: `${member.spouse.first_name} ${member.spouse.last_name || ""}`,
          }
        : null
    );
  };

  loadMember();
}, [memberId]);


  const loadTrees = async (input: string) => {
    const res = await api.get(`/family/trees?search=${input}`);
    return res.data.map((t: any) => ({
      value: t.id,
      label: t.name,
    }));
  };

  const loadMembers = async (input: string) => {
    const res = await api.get(`/family/members?search=${input}`);
    return res.data.map((m: any) => ({
      value: m.id,
      label: `${m.first_name} ${m.last_name || ""}`,
    }));
  };

  /* =========================
     FILE HANDLING
  ========================= */

  const handleFile = (file: File) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  /* =========================
     SUBMIT (CREATE + EDIT)
  ========================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const data = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) {
          data.append(k, String(v));
        }
      });

      if (file) {
        data.append("profile_photo", file);
      }

      if (mode === "edit") {
        await api.put(`/family/members/${memberId}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post(`/family/members/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/search/member");
    } catch (err: any) {
      if (err.response?.status === 400) {
        setErrors(err.response.data);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     THEME
  ========================= */

  const bg = darkMode
    ? "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white"
    : "bg-slate-100 text-slate-900";

  const card = darkMode
    ? "bg-slate-900/60 border-white/10"
    : "bg-white border-slate-200";

  const inputTheme = darkMode
    ? "bg-slate-800/60 text-white"
    : "bg-white text-slate-900 border-slate-300";

  const selectTheme = {
    control: (base: any) => ({
      ...base,
      backgroundColor: darkMode ? "#1e293b" : "#fff",
      borderColor: darkMode ? "#334155" : "#cbd5e1",
      borderRadius: "12px",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: darkMode ? "#fff" : "#000",
    }),
  };

  return (
    <div className={`min-h-screen ${bg}`}>

      <TopBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* FORM */}
      <div className="max-w-6xl mx-auto p-6">

        <form
          onSubmit={handleSubmit}
          className={`grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 rounded-3xl border ${card}`}
        >

          {/* IMAGE */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDrop={handleDrop}
            onDragLeave={() => setDragActive(false)}
            className="border-dashed border-2 rounded-2xl p-4 flex flex-col items-center justify-center"
          >
            {preview ? (
              <img src={preview} className="w-40 h-40 object-cover rounded-2xl" />
            ) : (
              <p>Drop image here</p>
            )}

            <button type="button" onClick={() => fileRef.current?.click()} className="mt-3 bg-indigo-600 px-4 py-2 rounded-xl">
              Upload
            </button>

            <input ref={fileRef} type="file" hidden onChange={(e) =>
              e.target.files?.[0] && handleFile(e.target.files[0])
            } />
          </div>

          {/* FIELDS */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

            <AsyncSelect
              loadOptions={loadTrees}
              styles={selectTheme}
              value={form.tree ? { value: form.tree, label: "Selected" } : null}
              onChange={(opt) => setForm({ ...form, tree: opt?.value })}
              placeholder="Family Tree"
            />

            <input className={`input ${inputTheme}`} placeholder="First Name"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />

            <input className={`input ${inputTheme}`} placeholder="Last Name"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />

            <select className={`input ${inputTheme}`}
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input type="date" className={`input ${inputTheme}`}
              value={form.birth_date}
              onChange={(e) => setForm({ ...form, birth_date: e.target.value })}
            />

            <input className={`input ${inputTheme}`} placeholder="Occupation"
              value={form.occupation}
              onChange={(e) => setForm({ ...form, occupation: e.target.value })}
            />

            {/* RELATIONS */}

            <AsyncSelect
              loadOptions={loadMembers}
              styles={selectTheme}
              placeholder="Father"
              value={selectedFather}
              onChange={(opt) => {
                setSelectedFather(opt);
                setForm({ ...form, father: opt?.value || null });
              }}
            />

            <AsyncSelect
              loadOptions={loadMembers}
              styles={selectTheme}
              placeholder="Mother"
              value={selectedMother}
              onChange={(opt) => {
                setSelectedMother(opt);
                setForm({ ...form, mother: opt?.value || null });
              }}
            />

            <AsyncSelect
              loadOptions={loadMembers}
              styles={selectTheme}
              placeholder="Spouse"
              value={selectedSpouse}
              onChange={(opt) => {
                setSelectedSpouse(opt);
                setForm({ ...form, spouse: opt?.value || null });
              }}
            />

            <textarea className={`input md:col-span-2 ${inputTheme}`}
              rows={4}
              value={form.biography}
              onChange={(e) => setForm({ ...form, biography: e.target.value })}
              placeholder="Biography"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.is_alive}
                onChange={(e) => setForm({ ...form, is_alive: e.target.checked })}
              />
              Is Alive
            </label>

            <button className="md:col-span-2 bg-indigo-600 py-3 rounded-2xl font-bold">
              {loading
                ? "Saving..."
                : mode === "edit"
                ? "Update Member"
                : "Create Member"}
            </button>

          </div>
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid transparent;
          outline: none;
        }
      `}</style>
    </div>
  );
}