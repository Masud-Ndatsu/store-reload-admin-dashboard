import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/store-logo.png";
import "./style.css";
import { Input } from "../../components/Input";
import { api } from "../../api/request";
import { useAuthToken } from "../../hooks/useAuthToken";

export interface IUser {
  email: string;
  password: string;
  status?: boolean;
}

export const Signin = () => {
  const navigate = useNavigate();
  const tokenData = useAuthToken();
  const [user, setUser] = React.useState<IUser>({ email: "", password: "" });

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      return setUser({ ...user, [name]: value });
    },
    [user]
  );
  useEffect(() => {
    if (!tokenData?.token) return;
    if (tokenData?.token) {
      return navigate("/dashboard");
    }
  }, []);

  const handleLogin = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      try {
        const result = await api().post(
          "https://store-reload.onrender.com/api/v1/admin/auth/login",
          user
        );
        console.log("RESULT", result);
        if (result.status == 200) {
          toast.success(result.data.message);
          setUser({ ...user, email: "", password: "" });
          window.localStorage.setItem("user", JSON.stringify(result.data.data));
          navigate("/dashboard");
        }
        return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.response?.data.message);
        console.error("ERROR", error?.response?.data.message);
        return;
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
          Have not Log in before?{" "}
          <strong>
            <Link to={"/signup"}>Sign up</Link>
          </strong>
        </p>
      </header>
      <section>
        <h1>Dashboard Sign In</h1>

        <form className="form" onSubmit={handleLogin}>
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
            }}
          >
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox">Remember me</label>
          </div>
          <div>
            <input
              style={{
                backgroundColor: "var(--main-blue)",
                color: "white",
                cursor: "pointer",
              }}
              type="submit"
              value="Sign In"
            />
          </div>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
};
