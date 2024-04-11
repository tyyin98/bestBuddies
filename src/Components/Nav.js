import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../services/apiAuth";

function Nav() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogOut = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  return (
    <div>
      <nav>
        <div className="linkContainer">
          <Link to="/">
            <div>
              <div>
                <img
                  className="logo"
                  src="./logoBuddies.png"
                  alt="Description"
                />
              </div>
              <div>
                <img
                  className="logo-text"
                  src="./logoText.png"
                  alt="Description"
                />
              </div>
            </div>
          </Link>
        </div>
        {/* <div>
    <Link to="/create">Create Your Post</Link>
  </div> */}
        <div className="post-button-container">
          {isAuthenticated && (
            <Link to="/create" className="button-style">
              Create Your Post
            </Link>
          )}
        </div>
        <div className="post-button-container">
          {isAuthenticated && (
            <span onClick={handleLogOut} className="logout-btn-style">
              Log out{" "}
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
