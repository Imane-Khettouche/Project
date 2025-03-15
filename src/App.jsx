import Auth from "./pages/Login/Auth.jsx";
import LandingPage from "./pages/Landing/LandingPage.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {path: "/", element: <LandingPage />},
  {path: "/Auth", element: <Auth />},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
