import { useUserContext } from "../../../contexts/UserContext";
import Table from "../../../components/Table";

export default function DashboardHome() {
  const { user } = useUserContext();
  return (
    <>
      <Table data={user} />
    </>
  );
}
