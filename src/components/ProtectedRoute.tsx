/* eslint-disable react-hooks/rules-of-hooks */
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// This is a Generic HOC to protect routes using the useAuth hook
const ProtectedRoute = <P extends object>(Component: React.FC<P>) => {
  return (props: P) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/login" />;
    }
    return <Component {...props} />;
  };
};

export default ProtectedRoute;
