import { createRoot } from "react-dom/client";
import "./index.css";
import MainPage from "@/pages/main-page/MainPage";

// Disable copying, context menu, and text selection
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("copy", (e) => e.preventDefault());
document.addEventListener("cut", (e) => e.preventDefault());
document.addEventListener("selectstart", (e) => e.preventDefault());

createRoot(document.getElementById("root")!).render(
  <>
    <MainPage />
  </>
);
