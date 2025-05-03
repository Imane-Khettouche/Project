import {DashboardAd} from "./AdminDashComp";
import {DashboardStud} from "./StudentDashComp";
import {DashboardPr} from "./ProfessorDashComp";
import {useUser} from "../UserContext";
function Dashboard() {
  const {userData} = useUser();
 return (
<div>
{ userData.role=== "Student" ?(
<DashboardStud/>
): userData.role==="Professor"?(
<DashboardPr/>
):userData.role=== "Admin" ?(
<DashboardAd/>
):(
<p>no user</p> )}
</div>);}

export default Dashboard;
