import { useParams } from "react-router-dom";
import MemberForm from "../components/MemberForm";

export default function EditMemberPage() {
  const { id } = useParams();

  return <MemberForm mode="edit" memberId={id} />;
}