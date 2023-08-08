import { Link } from "react-router-dom";
import "./style.css";

export const Sidebar = () => {
  const handleLogout = (): void => {
    if (window.localStorage.getItem("user")) {
      window.localStorage.removeItem("user");
      window.location.reload();
      console.log("LOGOUT SUCCESSFUL");
    } else {
      console.log("Already logged out");
    }
    return;
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
        <Link to={"/"} onClick={() => handleLogout()}>
          Log out
        </Link>
      </div>
    </aside>
  );
};
