import { useState } from "react";
import axios from "axios";
import "./App.css";

const SignupPage = (props) => {
  const [username, setUsername] = useState();
  const [secret, setSecret] = useState();

  const onSignUp = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { username, secret })
      .then((r) => props.onAuth({ ...r.data, secret })) // NOTE: over-ride secret
      .catch((e) => console.log(JSON.stringify(e.response.data)));
  };

  return (
    <form onSubmit={onSignUp}>
      <div className="title">or Sign Up</div>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name="secret"
        placeholder="Password"
        onChange={(e) => setSecret(e.target.value)}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        name="first_name"
        placeholder="First name"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last name"
        onChange={(e) => setLastName(e.target.value)}
      />
      <button type="submit">SIGN UP</button>
    </form>
  );
};

export default SignupPage;
