import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/apiAuth";

// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, setIsAuthenticated, setUser } = useAuth();
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

export default ProtectedRoute;
