import "./Auth.css";
import {Link} from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <div className="welcome">
        <div className="welcome-container">
          <h1>Welcome Back</h1>
          <p>You don&apos;t have an account? </p>
          <Link to="/Signup" >
            <button className="btn-signup">SignUP</button>
          </Link>
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

export default Login;
