import { useEffect, useState } from "react";
import { Navbar } from "../Navbar";
import "./style.css";
import { useLocation } from "react-router-dom";
import { CustomersInfo } from "../CustomersInfo";
import { SalesAnalytics } from "../SalesAnalytics";
import { CustomerSupport } from "../CustomerSupport";
import { Settings } from "../Settings";
import { Notifications } from "../Notifications";
import { Products } from "../Products";

enum ITab {
  products = "products",
  sales_report = "sales-report",
  customers_info = "customers-info",
  customer_support = "customer-support",
  notifications = "notifications",
  settings = "settings",
}

export const Content = () => {
  const { search } = useLocation();
  const [tab, setTab] = useState<string>("");
  const [activeTab, setActiveTab] = useState<JSX.Element>(<></>);

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const entries = Array.from(searchParams.entries());

    for (const [key, value] of entries)
      key.toLowerCase() === "tab" && setTab(value);
  }, [search]);
  useEffect(() => {
    switch (tab) {
      case "":
      case ITab.products:
        setActiveTab(<Products />);
        break;
      case ITab.sales_report:
        setActiveTab(<SalesAnalytics />);
        break;
      case ITab.customers_info:
        setActiveTab(<CustomersInfo />);
        break;
      case ITab.customer_support:
        setActiveTab(<CustomerSupport />);
        break;
      case ITab.notifications:
        setActiveTab(<Notifications />);
        break;
      case ITab.settings:
        setActiveTab(<Settings />);
        break;
      default:
        setActiveTab(<Products />);
    }
  }, [tab]);
  return (
    <div className="content" style={{ overflowY: "scroll" }}>
      <Navbar />
      {activeTab}
    </div>
  );
};
