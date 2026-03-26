import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReactQuery from "./components/providers/ReactQuery.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQuery>
      <App />
    </ReactQuery>
  </StrictMode>,
);
