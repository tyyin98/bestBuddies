import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/login");
      }
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}

// // Set login state in localStorage
// localStorage.setItem('isLoggedIn', 'true');

// // Retrieve login state from localStorage
// isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

// // Example: Update state based on stored value
// useEffect(() => {
//   const loggedStatus = localStorage.getItem('isLoggedIn') === 'true';
//   setIsAuthenticated(loggedStatus);
// }, []);

export default ProtectedRoute;
