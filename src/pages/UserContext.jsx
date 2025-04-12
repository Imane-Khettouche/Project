import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create the context
const UserContext = createContext();

// Define the UserProvider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Add propTypes after the component definition
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to access user context
export const useUser = () => useContext(UserContext);
