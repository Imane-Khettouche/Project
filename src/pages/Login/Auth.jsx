import "./Auth.css";
import {useState} from "react";
import axios from "axios";
function Login() {
  return (
    <div className="login">
      <div className="welcome">
        <div className="welcome-container">
          <h1>Welcome Back</h1>
          <p>You don&apos;t have an account? </p>
          <button className="btn-signup">SignUP</button>
        </div>
      </div>
      <div className="container">
        <h1>Login</h1>
        <p>Welcome back! Please login your account</p>
        <form>
          <div className="input">
            <input type="email" className="emailInput" />
            <label>Enter your email</label>
          </div>

          <div className="input">
            <input type="password" className="pswInput" />
            <label>Enter your password</label>
          </div>
          <button type="submit"> Login</button>
        </form>
        <p>
          Forget your password? <a>Reset password</a>{" "}
        </p>
      </div>
    </div>
  );
}
function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/Auth", {name, email, password})
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup">
      <div className="image-container"></div>
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
            Already have an account? <a href="#">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
export default function Auth() {
  return (
    <>
      <Login />
      <Signup />
    </>
  );
}
