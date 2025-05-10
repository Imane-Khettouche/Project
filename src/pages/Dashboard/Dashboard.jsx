import DashboardAd from "./AdminDashComp/dashboard/DashboardAd";
import DashboardStud from "./StudentDashComp/dashboard/DashboardStud";
import DashboardPr from "./ProfessorDashComp/dashboard/DashboardPr";
import {useUser} from "../UserContext";
function Dashboard() {
  const {userData} = useUser();
  return (
    <div>
      {userData.role === "Student" ? (
        <DashboardStud />
      ) : userData.role === "Professor" ? (
        <DashboardPr />
      ) : userData.role === "Admin" ? (
        <DashboardAd />
      ) : (
        <p>no user</p>
      )}
    </div>
  );
}

export default Dashboard;
