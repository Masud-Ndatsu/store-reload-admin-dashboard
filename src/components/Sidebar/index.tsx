import { Link } from "react-router-dom";
import "./style.css";

export const Sidebar = () => {
  const handleLogout = (): void => {
    if (window.localStorage.getItem("user")) {
      window.localStorage.removeItem("user");
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
        <li>Dashboard</li>
        <li>Sales report</li>
        <li>Customers information</li>
        <li>Customer support</li>
        <li>Settings</li>
      </ul>
      <div className="logout">
        <Link to={"/"} onClick={handleLogout}>
          Log out
        </Link>
      </div>
    </aside>
  );
};
