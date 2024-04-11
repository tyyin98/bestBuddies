import { useEffect, useState } from "react";
import { login } from "../services/apiAuth.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.js";
// import "../styles.css";

export default function Login() {
  const [email, setEmail] = useState("tyyin098@gmail.com");
  const [password, setPassword] = useState("1234567");
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const navigate = useNavigate();

  const { setUser, isAuthenticated, setIsAuthenticated } = useAuth();

  function handleEmailChange(email) {
    setEmail(email);
  }

  function handlePasswordChange(pw) {
    setPassword(pw);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setAttemptedLogin(true);
    // console.log({ email, password });
    if (!email || !password) {
      return;
    } else {
      login({ email, password }).then((res) => {
        if (res.data.user) {
          setUser(() => res.data.user);
          setIsAuthenticated(() => true);
          setIsWrongPassword(() => false);
        } else {
          setIsWrongPassword(true);
        }
      });
    }
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );

  return (
    <>
      <div className="usersignin">
        {/* <div className="mt-10 text-center"> */}

        <form>
          <p>Please sign in</p>
          <div className="loginbox">
            <span>Email</span>
            <input
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            ></input>
          </div>

          <div className="loginbox">
            <span>Password</span>
            <input
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            ></input>
          </div>
          <button onClick={(e) => handleSubmit(e)}>LOGIN</button>
        </form>
        {attemptedLogin && isWrongPassword && <p>WRONG PASSWORD</p>}

        <div className="loginbox">
          <span></span>
        </div>
      </div>
    </>
  );
}
