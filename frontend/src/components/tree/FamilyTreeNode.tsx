import { useState } from "react";
import { API_BASE_URL } from "../../config/constants";

interface Member {
  id: number;
  first_name: string;
  last_name?: string;
  gender?: string;
  profile_photo?: string;
  children?: Member[];
}

interface Props {
  member: Member;
  darkMode: boolean
}


export default function FamilyTreeNode({ member, darkMode }: Props) {
    // const [darkMode, setDarkMode] = useState(true);
    
    const card = darkMode
    ? "bg-slate-900/60 border-white/10"
    : "bg-white border-slate-200";

  return (
    <div className="entry">

      {/* NODE */}
      <div className="label">

        <div className={`member-card`}>

          {member.profile_photo ? (
            <img
              src={`${API_BASE_URL}${member.profile_photo}`}
              className="avatar"
            />
          ) : (
            <div className="avatar-placeholder">
              👤
            </div>
          )}

          <div className="member-info">

  <h3>
    {member.first_name}
    {" "}
    {member.last_name}
  </h3>

  <p>
    {member.gender}
  </p>

</div>
        </div>
      </div>

      {/* CHILDREN */}
      {member.children && member.children.length > 0 && (
        <div className="branch">

          {member.children.map((child) => (
            <FamilyTreeNode
              key={child.id}
              member={child}
            />
          ))}

        </div>
      )}
    </div>
  );
}