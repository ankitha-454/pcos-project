import React from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  Activity,
  Shield,
  Brain,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

export default function LandingPage() {
  const { user, logout, isAdmin } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Activity className="w-8 h-8 text-blue-600" />

            <span className="text-xl font-semibold text-gray-900">
              HealthPredict AI
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <nav className="flex gap-6">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Admin
                </Link>
              )}

              <Link
                to="/architecture"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Architecture
              </Link>

              <Link
                to="/pipeline"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                ML Pipeline
              </Link>
            </nav>

            {/* User */}
            <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
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
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
            <Shield className="w-4 h-4" />

            <span className="text-sm font-medium">
              AI-Powered Medical Screening
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Early PCOS & Cancer
            <br />
            Risk Detection
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Advanced machine learning algorithms analyze your health metrics to
            provide early detection of PCOS and assess potential cancer risk,
            enabling proactive healthcare management.
          </p>

          {/* CTA */}
          <Link to="/prediction">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center mx-auto">
              Start Prediction
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {/* Feature 1 */}
          <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Brain className="w-7 h-7 text-blue-600" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              AI-Based Analysis
            </h3>

            <p className="text-gray-600">
              Random Forest machine learning model trained on comprehensive
              medical datasets for accurate risk assessment.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Activity className="w-7 h-7 text-blue-600" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              PCOS Detection
            </h3>

            <p className="text-gray-600">
              Analyzes hormonal markers, BMI, cycle length, and clinical
              symptoms to predict PCOS risk with high accuracy.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-blue-600" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Cancer Risk Prediction
            </h3>

            <p className="text-gray-600">
              Two-stage prediction model correlates PCOS diagnosis with cancer
              risk factors for comprehensive screening.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">94.5%</div>

            <div className="text-gray-600">Model Accuracy</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>

            <div className="text-gray-600">Cases Analyzed</div>
          </div>

          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">0.96</div>

            <div className="text-gray-600">AUC Score</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 text-sm">
          <p>
            © 2026 HealthPredict AI. This is a demonstration system for
            educational purposes.
          </p>

          <p className="mt-2 text-xs text-gray-500">
            Always consult with healthcare professionals for medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
