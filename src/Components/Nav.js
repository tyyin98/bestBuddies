import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Hamburger from "./Hamburger";

function Nav() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="topNav">
      <Link to="/" className="logoContainer">
        <img className="logo" src="./logoBuddies.png" alt="Description" />
        <img className="logo-text" src="./logoText.png" alt="Description" />
      </Link>

      <div className="buttonContainer">
        {/* {isAuthenticated && (
          <span onClick={handleLogOut} className="logout-btn-style">
            Log out{" "}
          </span>
        )} */}

        {isAuthenticated && (
          <Link to="/create" className="button-style ">
            Create Your Post
          </Link>
        )}

        {isAuthenticated && <Hamburger />}
      </div>
    </nav>
  );
}

export default Nav;
