import { useContext,createContext,useState, Children } from "react";

const AuthContext=createContext();

export const Authprovider=({children})=>{
    const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
   const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

   const loginUser = ({ userData, token }) => {
    if (userData && token) {
      setUser(userData);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    }
  };

   const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
    return(
        <AuthContext.Provider value={{user,token,loginUser,logoutUser}}>
            {children}
        </AuthContext.Provider>

    );
}

export const useAuth = () => useContext(AuthContext);