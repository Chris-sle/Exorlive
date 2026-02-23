import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorkoutPage from "./pages/WorkoutPage.tsx";
import ExercisePage from "./pages/ExercisePage.tsx";
import { WorkoutPlayerProvider } from "./context/WorkoutPlayerContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WorkoutPlayerProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WorkoutPage />} />
          <Route path="/exercises/:id" element={<ExercisePage />} />
        </Routes>
      </BrowserRouter>
    </WorkoutPlayerProvider>
  </React.StrictMode>
);
