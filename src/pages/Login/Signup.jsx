import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
        role,
      });
      console.log(response.data);

      // Navigate to /Dash and send signup info as state
      if (role === "Admin") {
        navigate("/AdDash");
      } else if (role === "Student") {
        navigate("/StudentDash");
      } else navigate("/ProfDash");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 bg-indigo-600 text-white p-10 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-4">
              Hi! Ready for a new experience?
            </h1>
            <p className="mb-6">Already have an account?</p>
            <Link
              to="/login"
              className="bg-white text-indigo-600 py-2 px-4 rounded-full font-semibold hover:bg-indigo-100">
              Login
            </Link>
          </div>
        </div>

        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">Sign Up</h1>
          <p className="text-gray-600 mb-6">Create your account</p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <input
                type="text"
                className="mt-1 block w-full p-3 border rounded-md focus:ring focus:ring-indigo-200"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block">
              <input
                type="email"
                className="mt-1 block w-full p-3 border rounded-md focus:ring focus:ring-indigo-200"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <input
                type="password"
                className="mt-1 block w-full p-3 border rounded-md focus:ring focus:ring-indigo-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="block">
              <input
                type="password"
                className="mt-1 block w-full p-3 border rounded-md focus:ring focus:ring-indigo-200"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>

            <select
              className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-200"
              value={role}
              onChange={(e) => setRole(e.target.value)}>
              <option value="" hidden>
                Role
              </option>
              <option value="Professor">Professor</option>
              <option value="Student">Student</option>
              <option value="Admin">Admin</option>
            </select>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
