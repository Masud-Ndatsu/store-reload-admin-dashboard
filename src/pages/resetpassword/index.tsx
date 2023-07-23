import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import logo from "../../assets/store-logo.png";

export const ResetPassword = () => {
  return (
    <main className="signin-wrapper">
      <header>
        <h1>
          <Link to={"/"}>
            <img src={logo} alt="" />
            StoreReload
          </Link>
        </h1>
      </header>
      <section>
        <h1>Reset Password</h1>

        <form className="form" style={{ maxWidth: "500px" }}>
          <p style={{ textAlign: "center", padding: "1rem" }}>
            A password reset email have been sent to your email address
            @******@gmail.com. Click on the link sent to reset your password.
          </p>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              margin: "1rem 0",
              cursor: "pointer",
            }}></div>
          <div>
            <input
              style={{
                backgroundColor: "var(--main-blue)",
                color: "white",
                cursor: "pointer",
                textAlign: "center",
                margin: "0 auto",
              }}
              type="button"
              value="Go to Email"
            />
          </div>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
};
