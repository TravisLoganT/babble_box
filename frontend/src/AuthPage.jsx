import { useState } from "react";
import axios from "axios";
import "./App.css";

const AuthPage = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  {
    /* Login Form */
  }
  return (
    <div className="background">
      <form onSubmit={onLogin} className="form-card">
        <div className="form-title">Welcome 👋</div>
        <div className="form-subtitle">Let's get you signed in!</div>
        <div className="auth">
          <div className="auth-label">Username</div>
          <input
            className="auth-input"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="auth">
          <div className="auth-label">Password</div>
          <input
            className="auth-input"
            type="password"
            name="secret"
            onChange={(e) => setSecret(e.target.value)}
          />
          <button className="auth-button" type="submit">LOG IN</button>
        </div>
      </form>

    
    </div>
  );
};

export default AuthPage;
