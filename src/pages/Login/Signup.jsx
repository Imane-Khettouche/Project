import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state
  const [role, setRole] = useState("Student");
  const [error, setError] = useState(""); // Error handling
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password confirmation check
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        name,
        email,
        password,
        role,
      });
      console.log(response.data);

      // Redirect to login on success
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
        {/* Left Side */}
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

        {/* Right Side */}
        <div className="w-1/2 p-10">
          <h1 className="text-3xl font-semibold mb-4 text-gray-800">Sign Up</h1>
          <p className="text-gray-600 mb-6">Create your account</p>
          {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
          {/* Error Message */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              className="w-full p-3 border rounded-md"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="w-full p-3 border rounded-md"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-3 border rounded-md"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-3 border rounded-md"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Role Selection */}
            <div className="flex space-x-4">
              <select className="w-full p-3 border rounded-md" name="Role">
                <option value="Professor" />
                <option value="Student" />
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Sign Up
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
