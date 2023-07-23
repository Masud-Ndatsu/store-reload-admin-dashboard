import "./style.css";
import { Sidebar } from "../../components/Sidebar";
import { Content } from "../../components/Content";

export const Dashboard = () => {
  return (
    <main className="dashboard-wrapper">
      <Sidebar />
      <Content />
    </main>
  );
};
