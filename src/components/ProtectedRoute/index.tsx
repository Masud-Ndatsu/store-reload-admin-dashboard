import { Navigate, Outlet } from "react-router-dom";
import { useAuthToken } from "../../hooks/useAuthToken";

export const ProtectedRoute = () => {
  const { token } = useAuthToken();

  if (token) {
    return <Outlet />;
  }

  return <Navigate to={"/auth/signin"} />;
};
