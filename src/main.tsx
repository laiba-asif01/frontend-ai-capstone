import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SettingsPage } from "@/pages/SettingsPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingsPage />
  </StrictMode>,
);
