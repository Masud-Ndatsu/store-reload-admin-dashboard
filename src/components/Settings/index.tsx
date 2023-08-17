import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import profile from "../../assets/profile.jpg";
import "./style.css";
import { useAuthToken } from "../../hooks/useAuthToken";

export const Settings = () => {
  const tokenData = useAuthToken();
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    if (!tokenData?.token) return;
    setAvatar(tokenData.user?.avatar as string);
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h2>Settings</h2>

      <div className="admin-settings">
        <div className="tabs">
          <h4>My Profile</h4>
        </div>
        <div>
          <div className="image" style={{ position: "relative" }}>
            <img src={avatar ?? profile} alt="" />
            {true ? (
              <div className="edit-icon">+</div>
            ) : (
              <div className="edit-icon">
                <FiEdit2 />
              </div>
            )}
          </div>
          <form action="">
            <div>
              <label htmlFor="email">Enter your email</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="mrjude@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FiEdit2 />
              </div>
            </div>
            <div>
              <label htmlFor="password">Enter your password</label>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="password"
                  value={password}
                  placeholder="Storereload"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FiEdit2 />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
