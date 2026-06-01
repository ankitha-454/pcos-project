import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Activity,
  AlertCircle,
  CheckCircle,
  Info,
  LogOut,
  User,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

// Mock ML prediction engine
function calculatePrediction(data) {
  // Calculate LH/FSH ratio
  const lhFshRatio = data.lhLevel / data.fshLevel;

  // Risk calculations
  const bmiRisk = data.bmi > 25 ? 0.2 : 0;

  const cycleRisk = data.cycleLength > 35 || data.cycleLength < 21 ? 0.25 : 0;

  const hormonalRisk = lhFshRatio > 2 ? 0.3 : lhFshRatio > 1.5 ? 0.15 : 0;

  const insulinRisk = data.insulinLevel > 15 ? 0.15 : 0;

  const symptomRisk = (data.acneSeverity + data.hirsutismScore) * 0.05;

  // PCOS Risk
  const pcosRisk = Math.min(
    100,
    Math.round(
      (bmiRisk + cycleRisk + hormonalRisk + insulinRisk + symptomRisk) * 100,
    ),
  );

  // Category
  let pcosCategory = "Low";

  if (pcosRisk < 30) {
    pcosCategory = "Low";
  } else if (pcosRisk < 60) {
    pcosCategory = "Moderate";
  } else {
    pcosCategory = "High";
  }

  // Cancer Risk
  const ageRisk = data.age > 40 ? 0.15 : data.age > 30 ? 0.08 : 0.03;

  const pcosInfluence = pcosRisk * 0.25;

  const cancerRisk = Math.min(100, Math.round(ageRisk * 100 + pcosInfluence));

  // Recommendation
  let recommendation = "";

  if (pcosCategory === "High") {
    recommendation =
      "High PCOS risk detected. Immediate consultation with an endocrinologist is recommended. Regular monitoring of hormone levels and lifestyle modifications are advised.";
  } else if (pcosCategory === "Moderate") {
    recommendation =
      "Moderate PCOS risk. Schedule a consultation with your healthcare provider for comprehensive evaluation. Consider lifestyle changes including diet and exercise.";
  } else {
    recommendation =
      "Low PCOS risk. Continue healthy lifestyle practices and regular check-ups. Monitor any changes in symptoms.";
  }

  // Key Factors
  const keyFactors = [];

  if (lhFshRatio > 2) {
    keyFactors.push("Elevated LH/FSH ratio");
  }

  if (data.bmi > 25) {
    keyFactors.push("BMI above normal range");
  }

  if (data.cycleLength > 35) {
    keyFactors.push("Irregular menstrual cycles");
  }

  if (data.insulinLevel > 15) {
    keyFactors.push("Elevated insulin levels");
  }

  if (data.acneSeverity > 1 || data.hirsutismScore > 1) {
    keyFactors.push("Clinical symptoms present");
  }

  return {
    pcosRisk,
    pcosCategory,
    cancerRisk,
    recommendation,
    keyFactors:
      keyFactors.length > 0 ? keyFactors : ["No major risk factors identified"],
  };
}

export default function ResultsPage() {
  const [result, setResult] = useState(null);

  const { user, logout, isAdmin } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const dataStr = sessionStorage.getItem("patientData");

    if (dataStr) {
      const data = JSON.parse(dataStr);

      const prediction = calculatePrediction(data);

      setResult(prediction);
    }
  }, []);

  // Loading
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />

          <p className="text-gray-600">Analyzing your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Back */}
          <Link
            to="/prediction"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />

            <span>Back to Form</span>
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-blue-600" />

            <span className="text-xl font-semibold text-gray-900">
              HealthPredict AI
            </span>
          </div>

          {/* User */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="w-5 h-5 text-blue-600" />

              <span className="text-sm font-medium">{user?.name}</span>

              {isAdmin && (
                <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                  Admin
                </span>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Risk Assessment Results
          </h1>

          <p className="text-lg text-gray-600">
            AI-powered analysis based on your health metrics
          </p>
        </div>

        <div className="space-y-6">
          {/* PCOS Card */}
          <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  result.pcosCategory === "Low"
                    ? "bg-green-100"
                    : result.pcosCategory === "Moderate"
                      ? "bg-yellow-100"
                      : "bg-red-100"
                }`}
              >
                {result.pcosCategory === "Low" ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <AlertCircle
                    className={`w-6 h-6 ${
                      result.pcosCategory === "Moderate"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  />
                )}
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  PCOS Risk Assessment
                </h2>

                <p className="text-gray-600">
                  Polycystic Ovary Syndrome Detection
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Risk Probability</span>

                  <span className="text-2xl font-bold text-blue-600">
                    {result.pcosRisk}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full ${
                      result.pcosCategory === "Low"
                        ? "bg-green-500"
                        : result.pcosCategory === "Moderate"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{
                      width: `${result.pcosRisk}%`,
                    }}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center gap-2 pt-4">
                <span className="text-gray-700">Risk Category:</span>

                <span
                  className={`px-4 py-2 rounded-full font-semibold ${
                    result.pcosCategory === "Low"
                      ? "bg-green-100 text-green-700"
                      : result.pcosCategory === "Moderate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {result.pcosCategory}
                </span>
              </div>
            </div>
          </div>

          {/* Cancer Card */}
          <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Cancer Risk Estimation
                </h2>

                <p className="text-gray-600">Secondary risk assessment</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Estimated Cancer Risk</span>

                  <span className="text-2xl font-bold text-purple-600">
                    {result.cancerRisk}%
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-purple-600"
                    style={{
                      width: `${result.cancerRisk}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Factors */}
          <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Info className="w-6 h-6 text-blue-600" />
              </div>

              <h2 className="text-2xl font-semibold text-gray-900">
                Key Risk Factors
              </h2>
            </div>

            <ul className="space-y-3">
              {result.keyFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-blue-600 font-semibold">
                      {index + 1}
                    </span>
                  </div>

                  <span className="text-gray-700">{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Medical Recommendations
            </h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              {result.recommendation}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Next Steps */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>

                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Consult with healthcare provider</li>

                  <li>• Schedule comprehensive hormone panel</li>

                  <li>• Consider ultrasound examination</li>
                </ul>
              </div>

              {/* Lifestyle */}
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Lifestyle Changes
                </h3>

                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Maintain healthy weight</li>

                  <li>• Regular exercise routine</li>

                  <li>• Balanced, low-glycemic diet</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/prediction">
              <button className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 transition">
                New Prediction
              </button>
            </Link>

            <Link to="/">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
                Return Home
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
