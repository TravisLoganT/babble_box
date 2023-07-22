import { useState } from "react";
import "./App.css";
import AuthPage from "./AuthPage";
import SignupPage from "./SignupPage";
import ChatsPage from "./ChatsPage";

function App() {
  const [user, setUser] = useState(undefined);
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogIn] = useState(false);

  const onSignUpClick = () => {
    setSignUp(true);
  };

  const onLogInClick = () => {
    setLogIn(true);
  };

  if (!user) {
    if (signUp) {
      return <SignupPage onAuth={(user) => setUser(user)} />;
    }
    else {
      return <AuthPage onAuth={(user) => setUser(user)} onSignUpClick={onSignUpClick} />;
    }
  } else {
    return <ChatsPage user={user} />;
  }
}

export default App;
