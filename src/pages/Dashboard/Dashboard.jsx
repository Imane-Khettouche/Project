import "./Dashboard.css";
function DashboardStd() {
  return (
    <main>
      <h1>Hello student</h1>
    </main>
  );
}
function DashboardProf() {
  return (
    <main>
      <h1>Hello Professor</h1>
    </main>
  );
}
function DashboardAdmn() {
  return (
    <main>
      <h1>Hello Admin</h1>
    </main>
  );
}
export default function Dashboard() {
  return (
    <>
      <DashboardAdmn />
      <DashboardProf />
      <DashboardStd />
    </>
  );
}
