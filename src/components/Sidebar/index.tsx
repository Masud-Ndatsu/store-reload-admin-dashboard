import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { useAuthToken } from "../../hooks/useAuthToken";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { token } = useAuthToken();
  const handleLogout = (cb: () => void): void => {
    if (token) {
      window.localStorage.removeItem("token");
      navigate("/auth/signin");
      cb();
    }
  };

  return (
    <aside className="sidebar-wrapper">
      <h2>
        <Link to={"/"}>StoreReload</Link>
      </h2>
      <ul className="nav-links">
        <li>
          <Link to={"/dashboard?tab="}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/dashboard?tab=sales-report"}>Sales report</Link>
        </li>
        <li>
          <Link to={"/dashboard?tab=customers-info"}>
            Customers information
          </Link>
        </li>
        <li>
          <Link to={"/dashboard?tab=customer-support"}>Customer support</Link>
        </li>
        <li>
          <Link to={"/dashboard?tab=notifications"}>Notifications</Link>
        </li>
        <li>
          <Link to={"/dashboard?tab=settings"}>Settings</Link>
        </li>
      </ul>
      <div className="logout">
        <Link
          to={"/"}
          onClick={() => handleLogout(() => console.log("LOGGED OUT"))}
        >
          Log out
        </Link>
      </div>
    </aside>
  );
};
