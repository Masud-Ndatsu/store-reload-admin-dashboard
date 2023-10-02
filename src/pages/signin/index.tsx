import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/store-logo.png";
import "./style.css";
import { Input } from "../../components/Input";
import { api } from "../../api/request";
import { AUTH_URL } from "../../constants";

export interface IUser {
    email: string;
    password: string;
    status?: boolean;
}

export const Signin = () => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState<{ email: string; password: string }>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = React.useState<boolean>(false);

    const handleChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            return setUser({ ...user, [name]: value });
        },
        [user]
    );

    const handleLogin = React.useCallback(
        async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault();
            try {
                setLoading(true);
                const result = await api().post(AUTH_URL + "/login", user);
                setLoading(false);
                console.log(result);
                if (result.status == 200) {
                    setUser({ ...user, email: "", password: "" });
                    window.localStorage.setItem("token", result.data.data.token);
                    navigate("/dashboard");
                }
                return;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setLoading(false);
                toast.error(error.data.message);
                console.error("ERROR: ", error.data);
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
                        <Link to={"/auth/signup"}>Sign up</Link>
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
                            value={loading ? "loading..." : "Sign In"}
                        />
                    </div>
                </form>
            </section>
            <ToastContainer />
        </main>
    );
};
