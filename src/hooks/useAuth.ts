import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Custom hook to access the AuthContext
const useAuth = () => useContext(AuthContext);

export default useAuth;
