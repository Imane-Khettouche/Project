import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user info in localStorage or state
        localStorage.setItem("userData", JSON.stringify(data.user));
        const role = data.user.role;

        if (role === "Admin") {
          navigate("/AdDash");
        } else if (role === "Student") {
          navigate("/StudentDash");
        } else navigate("/ProfDash");
      } else {
        setError(data.message || "Invalid email or password");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-indigo-600 text-white p-10 flex flex-col justify-center items-center">
          <div className="welcome-container text-center">
            <h1 className="text-3xl font-semibold mb-4">Welcome Back</h1>
            <p className="mb-6">You don&apos;t have an account?</p>
            <Link to="/Signup">
              <button className="bg-white text-indigo-600 py-2 px-4 rounded-full font-semibold hover:bg-indigo-100 transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">Login</h1>
          <p className="text-gray-600 mb-6">
            Welcome back! Please login your account
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-200"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-200"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-4">
            Forget your password?{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Reset password
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
