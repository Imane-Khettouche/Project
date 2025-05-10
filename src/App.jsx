import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {UserProvider} from "./pages/UserContext.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Login/Signup.jsx";
import LandingPage from "./pages/Landing/LandingPage.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Portfolio from "./language.jsx";
import Solution from "./pages/Dashboard/StudentDashComp/solution/Solution.jsx";
import TeamOptions from "./pages/Dashboard/StudentDashComp/team/team.jsx";
import CodeCompiler from "./frontendeditor.jsx";
const router = createBrowserRouter([
  {path: "/", element: <LandingPage />},
  {path: "/Login", element: <Login />},
  {path: "/signup", element: <Signup />},
  {path: "/Dashboard", element: <Dashboard />},
  {path: "/e", element: <CodeCompiler />},
  {path: "/e2", element: <Portfolio />},
  {path: "/team", element: <TeamOptions />},
  {path: "/editor", element: <Solution />},
]);
function App() {
  return (
    <UserProvider>
      {" "}
      <RouterProvider router={router} />
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
