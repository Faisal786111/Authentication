import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log(email);
  console.log(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(import.meta.env);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/users/login`,
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      // Store the token in cookies
      Cookies.set("token", token, { expires: 0.02083, path: "/" }); // Expires in 30 minutes
      alert("Login Successful");

      navigate("/dashboard");
    } catch (e) {
      alert(e);
      console.log(e);
      alert(e.response.data.error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Don't have an account <a href="/sign-up">sign up?</a>
      </p>
    </form>
  );
};

export default Login;
