import { createRoot } from "react-dom/client";
import "./index.css";
import MainPage from "@/pages/main-page/MainPage";

createRoot(document.getElementById("root")!).render(
  <>
    <MainPage />
  </>
);
