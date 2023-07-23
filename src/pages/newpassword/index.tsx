import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/request";
import logo from "../../assets/store-logo.png";

export const NewPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState<string>("");
  const [token, setToken] = React.useState<string | null>(null);
  const [userId, setUserId] = React.useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params?.get("token"));
    setUserId(params?.get("id"));
  }, []);

  const handleLogin = React.useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      try {
        const result = await api().post(
          "https://store-reload.onrender.com/api/v1/admin/auth/new-password",
          { password, userId, token },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(result);

        if (result.status === 200) {
          setPassword("");
          navigate("/auth/signin");
        }
        toast(result.data.message);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast(error.response?.data?.message);
        console.error("ERROR", error.response?.data);
      }
    },
    [password, token, userId, navigate]
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
        <h1>New Password</h1>

        <form className="form" onSubmit={handleLogin}>
          <Input
            type="password"
            label="Enter your email password"
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
          />

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              margin: "1rem 0",
              cursor: "pointer",
            }}>
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
              value="Create new password"
            />
          </div>
        </form>
      </section>
      <ToastContainer />
    </main>
  );
};
