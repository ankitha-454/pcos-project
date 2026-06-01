import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Activity,
  Upload,
  Play,
  Check,
  Database,
  TrendingUp,
  BarChart3,
  LogOut,
  User,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

import { useAuth } from "../contexts/AuthContext";

// Mock training history data
const trainingHistory = [
  { epoch: 1, accuracy: 0.72, loss: 0.65 },
  { epoch: 2, accuracy: 0.78, loss: 0.52 },
  { epoch: 3, accuracy: 0.84, loss: 0.41 },
  { epoch: 4, accuracy: 0.88, loss: 0.33 },
  { epoch: 5, accuracy: 0.91, loss: 0.27 },
  { epoch: 6, accuracy: 0.93, loss: 0.22 },
  { epoch: 7, accuracy: 0.945, loss: 0.19 },
];

// Mock ROC curve data
const rocData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.05, tpr: 0.45 },
  { fpr: 0.1, tpr: 0.68 },
  { fpr: 0.15, tpr: 0.82 },
  { fpr: 0.2, tpr: 0.89 },
  { fpr: 0.25, tpr: 0.93 },
  { fpr: 0.3, tpr: 0.96 },
  { fpr: 0.4, tpr: 0.98 },
  { fpr: 0.5, tpr: 0.99 },
  { fpr: 1, tpr: 1 },
];

export default function AdminDashboard() {
  const [trainingStatus, setTrainingStatus] = useState("completed");

  const [uploadProgress, setUploadProgress] = useState(0);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDatasetUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Simulate Upload Progress
      let progress = 0;

      const interval = setInterval(() => {
        progress += 10;

        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);
    }
  };

  const handleTraining = () => {
    setTrainingStatus("training");

    // Simulate Training
    setTimeout(() => {
      setTrainingStatus("completed");
    }, 3000);
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
              Admin Dashboard
            </span>
          </div>

          {/* User */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User className="size-5 text-blue-600" />

              <span className="text-sm font-medium">{user?.name}</span>

              <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                Admin
              </span>
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

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ML Model Management
          </h1>

          <p className="text-lg text-gray-600">
            Upload datasets, train models, and monitor performance metrics
          </p>
        </div>

        {/* Top Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Dataset */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-blue-600" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Dataset
            </h3>

            <p className="text-sm text-gray-600 mb-4">10,247 samples loaded</p>

            <input
              type="file"
              accept=".csv"
              onChange={handleDatasetUpload}
              className="hidden"
              id="dataset-upload"
            />

            <label htmlFor="dataset-upload">
              <button className="w-full border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition flex items-center justify-center">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Dataset
              </button>
            </label>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>

                <p className="text-xs text-gray-600 mt-2">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
          </div>

          {/* Training */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-green-600" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Training
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              {trainingStatus === "idle"
                ? "Ready to train"
                : trainingStatus === "training"
                  ? "Training in progress..."
                  : "Training completed"}
            </p>

            <button
              onClick={handleTraining}
              disabled={trainingStatus === "training"}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                trainingStatus === "training"
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {trainingStatus === "training" ? (
                <span className="flex items-center justify-center">
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  Training...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Play className="w-4 h-4 mr-2" />
                  Start Training
                </span>
              )}
            </button>
          </div>

          {/* Status */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-purple-600" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Model Status
            </h3>

            <p className="text-sm text-gray-600 mb-4">Random Forest v2.3</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Last Trained:</span>

                <span className="font-semibold text-gray-900">
                  Feb 10, 2026
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>

                <span className="text-green-600 font-semibold">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Performance Metrics
              </h2>

              <p className="text-gray-600">Current model evaluation results</p>
            </div>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                label: "Accuracy",
                value: "94.5%",
                color: "blue",
              },
              {
                label: "Precision",
                value: "92.8%",
                color: "green",
              },
              {
                label: "Recall",
                value: "91.3%",
                color: "purple",
              },
              {
                label: "F1-Score",
                value: "0.96",
                color: "orange",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center p-6 bg-${item.color}-50 rounded-xl`}
              >
                <div
                  className={`text-4xl font-bold text-${item.color}-600 mb-2`}
                >
                  {item.value}
                </div>

                <div className="text-sm text-gray-700 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Training History
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trainingHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                <XAxis dataKey="epoch" />

                <YAxis yAxisId="left" />

                <YAxis yAxisId="right" orientation="right" />

                <Tooltip />

                <Legend />

                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#2563eb"
                  strokeWidth={2}
                  name="Accuracy"
                />

                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="loss"
                  stroke="#dc2626"
                  strokeWidth={2}
                  name="Loss"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROC */}
        <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                ROC Curve
              </h2>

              <p className="text-gray-600">
                Receiver Operating Characteristic (AUC = 0.96)
              </p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={rocData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

              <XAxis dataKey="fpr" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="tpr"
                stroke="#8b5cf6"
                fill="#c4b5fd"
                strokeWidth={2}
                name="ROC Curve"
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>AUC = 0.96:</strong> Excellent model performance. The
              model demonstrates high discriminative ability in distinguishing
              between PCOS positive and negative cases.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
