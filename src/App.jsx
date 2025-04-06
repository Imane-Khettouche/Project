import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Login/Signup.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import LandingPage from "./pages/Landing/LandingPage.jsx";
import Dashboard from "./pages/Dashboard/StudentDash.jsx";
import AdminDash from "./pages/Dashboard/AdminDash.jsx";
import ProfDash from "./pages/Dashboard/ProfDash.jsx";
//import AnimatedDivs from "./example.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {path: "/", element: <LandingPage />},
  {path: "/Login", element: <Login />},
  {path: "/signup", element: <Signup />},
  {path: "/Admin", element: <AdminLogin />},
  {path: "/StudentDash", element: <Dashboard />},
  {path: "/AdDash", element: <AdminDash />},
  {path: "/ProfDash", element: <ProfDash />},
  // {path: "/example", element: <AnimatedDivs />},
]);
//<RouterProvider router={router} />
//import Dashboard from "./pages/Dashboard/Dashboard.jsx"

function App() {
  return <RouterProvider router={router} />;
}

export default App;
