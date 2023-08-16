import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { ForgotPassword } from "./pages/forgotpassword";
import { ResetPassword } from "./pages/resetpassword";
import { NewPassword } from "./pages/newpassword";
import { Dashboard } from "./pages/dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="auth/signin" element={<Signin />} />
          <Route path="auth/signup" element={<Signup />} />
          <Route path="auth/forgot-password" element={<ForgotPassword />} />
          <Route path="auth/reset-password" element={<ResetPassword />} />
          <Route path="auth/change-password" element={<NewPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
