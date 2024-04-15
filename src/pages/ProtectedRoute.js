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
      async function authorizeUser() {
        const user = await getCurrentUser();
        if (user) {
          setIsAuthenticated(true);
          // console.log("see below");
          // console.log(user);
          setUser(user);
          setIsLoading(false);
        } else {
          console.log("triggered");
          navigate("/login");
        }
      }
      authorizeUser();
    },
    [isAuthenticated, setIsAuthenticated, setUser, navigate]
  );

  return <div>{!isLoading && children}</div>;
}

export default ProtectedRoute;
