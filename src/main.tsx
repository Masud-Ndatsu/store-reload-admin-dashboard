import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import ErrorBoundary from "./components/ErrorBoundary/index.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.Fragment>
        <App />
    </React.Fragment>
);
