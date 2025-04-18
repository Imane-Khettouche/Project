import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData"); 
    }
  }, [userData]); 

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};


UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useUser = () => useContext(UserContext);
