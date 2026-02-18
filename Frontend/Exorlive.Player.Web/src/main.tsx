import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import WorkoutPage  from "./pages/WorkoutPage.tsx";
import ExercisePage from "./pages/ExercisePage.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkoutPage />} />
        <Route path="/exercises/:id" element={<ExercisePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
