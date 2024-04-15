import { Link } from "react-router-dom";
import { logout } from "../services/apiAuth";
import { useAuth } from "../contexts/AuthContext";

function HamburgerMenu({ menuOpen, setMenuOpen }) {
  const { setIsAuthenticated } = useAuth();
  const handleLogOut = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  return (
    <div className="hamburgerMenuOverlay">
      <div className="hamburgerMenu">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="closeHMenuButton"
        >
          X
        </button>
        <Link to="#" className="dashboardLink">
          Dashboard
        </Link>
        <div onClick={handleLogOut} className="logoutButton">
          Logout
        </div>
      </div>
    </div>
  );
}

export default HamburgerMenu;
