import "./Auth.css";
import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/Signup", {name, email, password})
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup">
      {" "}
      <div className="welcome">
        <div className="welcome-container">
          <h1>Hi! Are you ready for new experience?</h1>
          <p>You don&apos;t have an account? </p>
          <Link to="/Login" className="btn-signup">
            Login
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Sign Up</h1>
        <p>Create your account</p>
        <form onSubmit={handleSubmit}>
          {" "}
          <div className="input">
            <input
              type="text"
              className="nameInput"
              autoComplete="off"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Your Name</label>
          </div>
          <div className="input">
            <input
              type="email"
              className="emailInput"
              autoComplete="off"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Your Email</label>
          </div>
          <div className="input">
            <input
              type="password"
              className="pswInput"
              autoComplete="off"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="input">
            <input type="password" className="confirmPswInput" />
            <label>Confirm Password</label>
          </div>
          <button type="submit">Sign Up</button>
          <p>
            Already have an account?{" "}
            <Link to="/Login" className="a-login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Signup;
