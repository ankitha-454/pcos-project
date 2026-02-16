import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import PredictionForm from "./components/PredictionForm";
import ResultsPage from "./components/ResultsPage";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [predictionResult, setPredictionResult] = useState(null);
  const [formData, setFormData] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/prediction"
            element={
              <PredictionForm
                setPredictionResult={setPredictionResult}
                setFormData={setFormData}
              />
            }
          />
          <Route
            path="/results"
            element={
              <ResultsPage result={predictionResult} formData={formData} />
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
