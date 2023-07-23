import { useState } from "react";
import axios from "axios";
import "./App.css";

const AuthPage = (props) => {
  const { onAuth, onSignUpClick } = props;
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_BACKEND_URL}/login`, { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  return (
    <div className="background">
      <form onSubmit={onLogin} className="form-card">
        <div className="form-title">Welcome Back 👋</div>
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
          <button className="auth-button" type="submit">
            LOG IN
          </button>
        </div>
        <button className="check-button" onClick={onSignUpClick} type="button">
          Don't Have An Account? Sign Up Here!
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
