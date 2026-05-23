import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import FamilyTreeNode from "../components/tree/FamilyTreeNode";

import "../components/tree/FamilyTree.css";
import AppHeader from "../components/layout/AppHeader";
import TopBar from "../components/layout/TopBar";

export default function FamilyTreePage() {
  const { id } = useParams();
  const [tree, setTree] = useState<any>(null);
    const [darkMode, setDarkMode] = useState(true);

  const loadTree = async () => {
    const res = await api.get(`/family/tree/${id}/`);
    console.log(res.data)
    setTree(res.data);
  };

  const bg = darkMode
    ? "bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white"
    : "bg-slate-100 text-slate-900";




  useEffect(() => {
    loadTree();
  }, []);

  if (!tree) {
    return (
      <div className="tree-wrapper">
        Loading...
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bg}`}>
      <TopBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="tree-root">
        <FamilyTreeNode member={tree} darkMode={darkMode} />
      </div>

    </div>
  );
}