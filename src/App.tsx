import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  redirect,
} from "react-router-dom";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { ForgotPassword } from "./pages/forgotpassword";
import { ResetPassword } from "./pages/resetpassword";
import { NewPassword } from "./pages/newpassword";
import { Dashboard } from "./pages/dashboard";
import { useAuthToken } from "./hooks/useAuthToken";
redirect("");

function App() {
  const isAuthenticated = useAuthToken();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated.user ? (
                <Navigate to="/auth/signin" />
              ) : (
                <Dashboard />
              )
            }
          />
          <Route
            path="dashboard"
            element={
              !isAuthenticated.user ? (
                <Navigate to="/auth/signin" />
              ) : (
                <Dashboard />
              )
            }
          />
          <Route path="auth/signin" element={<Signin />} />
          <Route path="auth/signup" element={<Signup />} />
          <Route path="auth/forgot-password" element={<ForgotPassword />} />
          <Route path="auth/reset-password" element={<ResetPassword />} />
          <Route path="auth/change-password" element={<NewPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
