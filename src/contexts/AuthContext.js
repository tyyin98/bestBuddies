import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {isLoading && "LOADING"}
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext is used outside AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
