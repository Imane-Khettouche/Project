import {useEffect, useState} from "react";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "User");
    setUserRole(localStorage.getItem("userRole") || "student");
  }, []);

  return (
    <main className="flex justify-center items-center m-20 bg-indigo-600 p-15 rounded-4xl">
      <h1 className="text-4xl text-white ">Hi, {userName}!</h1>
      {userRole === "admin" && <DashboardAdmn />}
      {userRole === "professor" && <DashboardProf />}
      {userRole === "student" && <DashboardStd />}
    </main>
  );
}

function DashboardStd() {
  return <h2>Welcome to the Student Dashboard</h2>;
}

function DashboardProf() {
  return <h2>Welcome to the Professor Dashboard</h2>;
}

function DashboardAdmn() {
  return <h2>Welcome to the Admin Dashboard</h2>;
}
