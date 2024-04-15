import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
import HamburgerMenu from "./HamburgerMenu";

function Hamburger() {
  const [menuOpen, setMenuOpen] = useState(false);
  //   const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* <span >=</span> */}
      <button
        aria-label="Menu"
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </button>
      {menuOpen && (
        <HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      )}
    </div>
  );
}

export default Hamburger;
