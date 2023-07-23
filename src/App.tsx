import {} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { ForgotPassword } from "./pages/forgotpassword";
import { ResetPassword } from "./pages/resetpassword";
import { NewPassword } from "./pages/newpassword";
import { Dashboard } from "./pages/dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/auth/signin", element: <Signin /> },
  { path: "/auth/signup", element: <Signup /> },
  { path: "/auth/forgot-password", element: <ForgotPassword /> },
  { path: "/auth/reset-password", element: <ResetPassword /> },
  { path: "/auth/change-password/", element: <NewPassword /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
