import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Activity,
  Heart,
} from "lucide-react";

const ResultsPage = ({ result, formData }) => {
  const navigate = useNavigate();

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Results Found
          </h2>
          <p className="text-gray-600 mb-6">
            Please complete the assessment first
          </p>
          <button
            onClick={() => navigate("/prediction")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Assessment
          </button>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk) => {
    if (risk < 30) return "green";
    if (risk < 60) return "yellow";
    return "red";
  };

  const getRiskLevel = (risk) => {
    if (risk < 30) return "Low Risk";
    if (risk < 60) return "Moderate Risk";
    return "High Risk";
  };

  const pcosColor = getRiskColor(result.pcosRisk);
  const cancerColor = getRiskColor(result.cancerRisk);

  const recommendations = {
    low: [
      "Maintain current healthy lifestyle",
      "Regular exercise (30 minutes daily)",
      "Balanced diet rich in nutrients",
      "Annual health checkups",
      "Stress management practices",
    ],
    moderate: [
      "Consult with a healthcare provider",
      "Comprehensive hormonal panel tests",
      "Consider dietary modifications",
      "Increase physical activity",
      "Monitor symptoms regularly",
      "Consider seeing an endocrinologist",
    ],
    high: [
      "Immediate consultation with healthcare provider recommended",
      "Comprehensive diagnostic tests",
      "Detailed hormonal evaluation",
      "Consider specialist referral (endocrinologist/gynecologist)",
      "Lifestyle intervention program",
      "Regular monitoring and follow-ups",
    ],
  };

  const getRecommendations = () => {
    const maxRisk = Math.max(result.pcosRisk, result.cancerRisk);
    if (maxRisk < 30) return recommendations.low;
    if (maxRisk < 60) return recommendations.moderate;
    return recommendations.high;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/prediction")}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            New Assessment
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Health Assessment Results
          </h1>
          <p className="text-gray-600">
            Generated on {new Date(result.timestamp).toLocaleString()}
          </p>
        </div>

        {/* Main Results */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* PCOS Risk Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">PCOS Risk</h2>
              <Activity className={`w-8 h-8 text-${pcosColor}-600`} />
            </div>

            <div className="mb-6">
              <div className="flex items-end justify-center mb-4">
                <span className="text-6xl font-bold text-gray-900">
                  {result.pcosRisk}
                </span>
                <span className="text-3xl text-gray-600 ml-2 mb-2">%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full bg-${pcosColor}-500 transition-all duration-1000 ease-out`}
                  style={{ width: `${result.pcosRisk}%` }}
                />
              </div>
            </div>

            <div
              className={`p-4 rounded-lg bg-${pcosColor}-50 border border-${pcosColor}-200`}
            >
              <p className={`font-semibold text-${pcosColor}-800 text-center`}>
                {result.pcosCategory} Risk
              </p>
            </div>

            {formData && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Key Indicators:
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>LH/FSH Ratio:</span>
                    <span className="font-semibold">{result.lhFshRatio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cycle Length:</span>
                    <span className="font-semibold">
                      {formData.cycleLength} days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>BMI:</span>
                    <span className="font-semibold">{formData.bmi}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cancer Risk Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Cancer Risk</h2>
              <Heart className={`w-8 h-8 text-${cancerColor}-600`} />
            </div>

            <div className="mb-6">
              <div className="flex items-end justify-center mb-4">
                <span className="text-6xl font-bold text-gray-900">
                  {result.cancerRisk}
                </span>
                <span className="text-3xl text-gray-600 ml-2 mb-2">%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full bg-${cancerColor}-500 transition-all duration-1000 ease-out`}
                  style={{ width: `${result.cancerRisk}%` }}
                />
              </div>
            </div>

            <div
              className={`p-4 rounded-lg bg-${cancerColor}-50 border border-${cancerColor}-200`}
            >
              <p
                className={`font-semibold text-${cancerColor}-800 text-center`}
              >
                {getRiskLevel(result.cancerRisk)}
              </p>
            </div>

            {formData && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Risk Factors:
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Age:</span>
                    <span className="font-semibold">{formData.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insulin Level:</span>
                    <span className="font-semibold">
                      {formData.insulinLevel} µU/mL
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>PCOS Risk:</span>
                    <span className="font-semibold">{result.pcosRisk}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Confidence Score */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Model Confidence
              </h3>
              <p className="text-gray-600">Prediction reliability score</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {result.confidence}%
              </div>
              <p className="text-sm text-gray-500">High Confidence</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-1000 ease-out"
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Recommendations
            </h2>
          </div>

          <div className="space-y-3">
            {getRecommendations().map((rec, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
          <div className="flex">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">
                Important Notice
              </h3>
              <p className="text-yellow-700 text-sm">
                This assessment is for educational and informational purposes
                only. It does not constitute medical advice, diagnosis, or
                treatment. Always consult with qualified healthcare
                professionals for proper medical evaluation and personalized
                health recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/prediction")}
            className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition shadow-lg font-semibold"
          >
            New Assessment
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-white text-blue-600 px-6 py-4 rounded-lg hover:bg-gray-50 transition shadow-lg font-semibold border-2 border-blue-600"
          >
            Print Results
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-4 rounded-lg hover:bg-gray-200 transition shadow-lg font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
