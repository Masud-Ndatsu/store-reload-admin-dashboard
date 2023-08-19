import { useRef, useState, useCallback, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import "./style.css";
import { useAuthToken } from "../../hooks/useAuthToken";
import { api } from "../../api/request";
import { USER_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/profile.jpg";

export const Settings = () => {
  const { token } = useAuthToken();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputRef = () => {
    inputRef.current?.click();
  };

  const handleAvatarUpload = useCallback(async (e: any) => {
    const dataString = URL.createObjectURL(e.target.files[0]);
    setPreview(dataString);

    const fd = new FormData();

    for (const file of e.target.files || []) {
      fd.append("avatar", file);
    }

    const result = await api().put(`${USER_URL}/avatar`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.status == 401) {
      navigate("/auth/signin");
    }
    navigate("/dashboard?tab=settings");
  }, []);

  const getAvatar = useCallback(
    async function () {
      try {
        const res = await api().get(`${USER_URL}/avatar`, {
          headers: { Authorization: "Bearer " + token },
        });
        setAvatar(res.data.data);
      } catch (error: any) {
        console.log({ error });
      }
    },
    [token]
  );

  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  return (
    <div>
      <h2>Settings</h2>

      <div className="admin-settings">
        <div className="tabs">
          <h4>My Profile</h4>
        </div>
        <div>
          <div className="image" style={{ position: "relative" }}>
            <input
              type="file"
              ref={inputRef}
              onChange={handleAvatarUpload}
              hidden
            />
            <img src={avatar ? avatar : preview ?? profile} alt="" />
            {true ? (
              <div className="edit-icon" onClick={handleInputRef}>
                +
              </div>
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
