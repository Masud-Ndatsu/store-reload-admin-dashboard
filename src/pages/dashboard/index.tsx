import "./style.css";
import { Sidebar } from "../../components/Sidebar";
import { Content } from "../../components/Content";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthToken } from "../../hooks/useAuthToken";
import { CategoryProvider } from "../../context/CategoryProvider";

export const Dashboard = () => {
  const { token } = useAuthToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth/signin");
      return;
    }
  }, [navigate]);

  return (
    <CategoryProvider>
      <main className="dashboard-wrapper">
        <Sidebar />
        <Content />
      </main>
    </CategoryProvider>
  );
};
