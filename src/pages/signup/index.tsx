import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/store-logo.png";
import "./style.css";
import { Input } from "../../components/Input";
import { api } from "../../api/request";

interface IUser {
  email: string;
  password: string;
  status?: boolean;
}

export const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<IUser>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    return setUser({ ...user, [name]: value });
  };

  const handleSignup = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      try {
        const result = await api().post(
          "https://store-reload.onrender.com/api/v1/admin/auth/create",
          user
        );

        if (result.status === 200) {
          setUser({ ...user, email: "", password: "" });
          navigate("/auth/signin");
        }
        toast(result.data.message);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast(error.response.data.message);
        console.error("ERROR", error.response.data);
      }
    },
    [user, navigate]
  );

  return (
    <main className="signin-wrapper">
      <header>
        <h1>
          <Link to={"/"}>
            <img src={logo} alt="" />
            StoreReload
          </Link>
        </h1>
        <p>
          Already have an account?{" "}
          <strong>
            <Link to={"/signin"}>Sign in</Link>
          </strong>
        </p>
      </header>
      <section>
        <h1>Dashboard Sign Up</h1>

        <form className="form" onSubmit={handleSignup}>
          <Input
            type="email"
            label="Enter your email address"
            handleChange={handleChange}
            value={user.email}
            name="email"
          />
          <Input
            type="password"
            label="Enter your password"
            handleChange={handleChange}
            value={user.password}
            name="password"
          />
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              margin: "1rem 0",
              cursor: "pointer",
            }}>
            <strong>
              <Link to={"/forgot-password"}>forgot password</Link>
            </strong>
          </div>
          <div>
            <input
              style={{
                backgroundColor: "var(--main-blue)",
                color: "white",
                cursor: "pointer",
              }}
              type="submit"
              value="Sign up"
            />
          </div>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
};
