import { AiOutlineCalendar } from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsEnvelope } from "react-icons/bs";
import "./style.css";
import logo from "../../assets/image4.jpg";
import { useCallback, useEffect, useState } from "react";
import { USER_URL } from "../../constants";
import { useAuthToken } from "../../hooks/useAuthToken";
import { api } from "../../api/request";

export const Navbar = (): JSX.Element => {
  const { token } = useAuthToken();
  const [avatar, setAvatar] = useState<string>("");
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

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <nav className="navbar">
      <div className="nav-left">
        <input
          type="search"
          name="search"
          autoComplete="off"
          placeholder="Search for something"
        />
      </div>
      <div className="nav-right">
        <div
          style={{
            border: "1px solid #b3b3b3",
            padding: ".5rem",
            borderRadius: "3px",
          }}
        >
          <AiOutlineCalendar />
          <span>{formattedDate.replace(/\//g, ". ")}</span>
        </div>
        <div style={{ display: "flex" }}>
          <BsEnvelope />
          <IoIosNotificationsOutline />
        </div>
        <div>
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          >
            <img
              src={avatar ? avatar : logo}
              alt=""
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </div>
          <div>
            <p>John Doe</p>
            <small>Admin</small>
          </div>
        </div>
      </div>
    </nav>
  );
};
