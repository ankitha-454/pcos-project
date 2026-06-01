import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { ArrowLeft, Activity, LogOut, User } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

export default function PredictionForm() {
  const navigate = useNavigate();

  const { user, logout, isAdmin } = useAuth();

  // EMPTY DEFAULT VALUES
  const [formData, setFormData] = useState({
    age: "",
    bmi: "",
    cycleLength: "",
    lhLevel: "",
    fshLevel: "",
    insulinLevel: "",
    acneSeverity: "",
    hirsutismScore: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store data in sessionStorage
    sessionStorage.setItem("patientData", JSON.stringify(formData));

    navigate("/results");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Back */}
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="size-5" />
            <span>Back to Home</span>
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Activity className="size-8 text-blue-600" />

            <span className="text-xl font-semibold text-gray-900">
              HealthPredict AI
            </span>
          </div>

          {/* User */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="size-5 text-blue-600" />

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
              <LogOut className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Patient Health Assessment
          </h1>

          <p className="text-lg text-gray-600">
            Enter your health metrics for AI-powered risk analysis
          </p>
        </div>

        {/* Card */}
        <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Age */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  Age (years)
                </label>

                <input
                  id="age"
                  type="number"
                  min="18"
                  max="100"
                  step="1"
                  placeholder="Ex: 28"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* BMI */}
              <div>
                <label
                  htmlFor="bmi"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  BMI (kg/m²)
                </label>

                <input
                  id="bmi"
                  type="number"
                  min="10"
                  max="60"
                  step="0.1"
                  placeholder="Ex: 24.5"
                  value={formData.bmi}
                  onChange={(e) => handleInputChange("bmi", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Cycle Length */}
              <div>
                <label
                  htmlFor="cycleLength"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  Menstrual Cycle Length (days)
                </label>

                <input
                  id="cycleLength"
                  type="number"
                  min="20"
                  max="60"
                  step="1"
                  placeholder="Ex: 28"
                  value={formData.cycleLength}
                  onChange={(e) =>
                    handleInputChange("cycleLength", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* LH */}
              <div>
                <label
                  htmlFor="lhLevel"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  LH Level (mIU/mL)
                </label>

                <input
                  id="lhLevel"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="Ex: 8.5"
                  value={formData.lhLevel}
                  onChange={(e) => handleInputChange("lhLevel", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* FSH */}
              <div>
                <label
                  htmlFor="fshLevel"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  FSH Level (mIU/mL)
                </label>

                <input
                  id="fshLevel"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="Ex: 6.2"
                  value={formData.fshLevel}
                  onChange={(e) =>
                    handleInputChange("fshLevel", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Insulin */}
              <div>
                <label
                  htmlFor="insulinLevel"
                  className="block text-gray-700 mb-2 font-medium"
                >
                  Insulin Level (µU/mL)
                </label>

                <input
                  id="insulinLevel"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="Ex: 12.5"
                  value={formData.insulinLevel}
                  onChange={(e) =>
                    handleInputChange("insulinLevel", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Acne */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Acne Severity
                </label>

                <select
                  value={formData.acneSeverity}
                  onChange={(e) =>
                    handleInputChange("acneSeverity", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="" disabled>
                    Select Severity
                  </option>

                  <option value="0">0 - None</option>
                  <option value="1">1 - Mild</option>
                  <option value="2">2 - Moderate</option>
                  <option value="3">3 - Severe</option>
                </select>
              </div>

              {/* Hirsutism */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Hirsutism Score
                </label>

                <select
                  value={formData.hirsutismScore}
                  onChange={(e) =>
                    handleInputChange("hirsutismScore", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                >
                  <option value="" disabled>
                    Select Severity
                  </option>

                  <option value="0">0 - None</option>
                  <option value="1">1 - Mild</option>
                  <option value="2">2 - Moderate</option>
                  <option value="3">3 - Severe</option>
                </select>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This prediction system uses machine
                learning to assess risk. Results should be discussed with a
                qualified healthcare professional.
              </p>
            </div>

            {/* Submit */}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Predict Risk
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
