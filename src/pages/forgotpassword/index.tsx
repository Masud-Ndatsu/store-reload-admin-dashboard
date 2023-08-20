import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";
import { api } from "../../api/request";
import logo from "../../assets/store-logo.png";
import { AUTH_URL } from "../../constants";

export const ForgotPassword = () => {
  const [email, setEmail] = React.useState<string>("");
  console.log(email);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    return setEmail(value);
  };

  const handleLogin = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      try {
        const result = await api().post(AUTH_URL + "/forgot-password", {
          email,
        });
        console.log(result);

        if (result.status === 200) {
          setEmail("");
        }
        toast(result.data.message);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast(error.response?.data?.message);
        console.error("ERROR", error.response?.data);
      }
    },
    [email]
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
      </header>
      <section>
        <h1>Forgot Password</h1>

        <form className="form" onSubmit={handleLogin}>
          <Input
            type="email"
            label="Enter your email address"
            handleChange={handleChange}
            value={email}
            name="email"
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
