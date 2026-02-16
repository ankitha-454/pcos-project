import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, TrendingUp, Users, Activity, Award } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const modelMetrics = {
    accuracy: 94.5,
    precision: 92.8,
    recall: 91.3,
    f1Score: 92.0,
    aucRoc: 0.96,
    totalPredictions: 10247,
    modelVersion: '2.3'
  };

  const trainingHistory = [
    { epoch: 1, trainAcc: 78.2, valAcc: 76.5, loss: 0.45 },
    { epoch: 2, trainAcc: 84.5, valAcc: 82.3, loss: 0.35 },
    { epoch: 3, trainAcc: 88.7, valAcc: 86.9, loss: 0.28 },
    { epoch: 4, trainAcc: 92.3, valAcc: 90.1, loss: 0.21 },
    { epoch: 5, trainAcc: 94.8, valAcc: 92.4, loss: 0.16 },
    { epoch: 6, trainAcc: 96.2, valAcc: 93.8, loss: 0.12 },
    { epoch: 7, trainAcc: 97.5, valAcc: 94.5, loss: 0.09 }
  ];

  const rocCurveData = [
    { fpr: 0.0, tpr: 0.0 },
    { fpr: 0.05, tpr: 0.45 },
    { fpr: 0.1, tpr: 0.72 },
    { fpr: 0.15, tpr: 0.84 },
    { fpr: 0.2, tpr: 0.91 },
    { fpr: 0.25, tpr: 0.95 },
    { fpr: 0.3, tpr: 0.97 },
    { fpr: 1.0, tpr: 1.0 }
  ];

  const featureImportance = [
    { feature: 'LH/FSH Ratio', importance: 28.5 },
    { feature: 'BMI', importance: 19.3 },
    { feature: 'Cycle Length', importance: 16.8 },
    { feature: 'Insulin Level', importance: 14.2 },
    { feature: 'Age', importance: 8.9 },
    { feature: 'LH Level', importance: 5.7 },
    { feature: 'FSH Level', importance: 3.4 },
    { feature: 'Hirsutism', importance: 2.1 },
    { feature: 'Acne', importance: 1.1 }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      // In real implementation, this would upload to backend
      alert(`File "${file.name}" selected. Ready for training.`);
    }
  };

  const handleTrainModel = () => {
    alert('Training started with new dataset. This may take several minutes...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Model performance metrics and dataset management</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-10 h-10 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                Excellent
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{modelMetrics.accuracy}%</div>
            <div className="text-gray-600 text-sm">Model Accuracy</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-10 h-10 text-green-600" />
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                High
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{modelMetrics.aucRoc}</div>
            <div className="text-gray-600 text-sm">AUC-ROC Score</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-purple-600" />
              <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                Strong
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{modelMetrics.precision}%</div>
            <div className="text-gray-600 text-sm">Precision</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-orange-600" />
              <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                Active
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{modelMetrics.totalPredictions.toLocaleString()}</div>
            <div className="text-gray-600 text-sm">Total Predictions</div>
          </div>
        </div>

        {/* Dataset Management */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Upload className="w-7 h-7 text-blue-600 mr-3" />
            Dataset Management
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-700 font-semibold mb-2">Upload New Dataset</p>
                <p className="text-gray-500 text-sm">CSV files only, max 50MB</p>
                {selectedFile && (
                  <p className="text-blue-600 text-sm mt-2">Selected: {selectedFile}</p>
                )}
              </label>
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-1"><strong>Current Dataset:</strong></p>
                <p className="text-sm text-gray-600">pcos_dataset.csv</p>
                <p className="text-sm text-gray-600">10,000 samples • Last updated: Feb 13, 2026</p>
              </div>
              
              <button
                onClick={handleTrainModel}
                disabled={!selectedFile}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  selectedFile
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Train New Model
              </button>
            </div>
          </div>
        </div>

        {/* Training History Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Training History</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trainingHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="trainAcc" stroke="#3B82F6" name="Training Accuracy" strokeWidth={2} />
              <Line type="monotone" dataKey="valAcc" stroke="#10B981" name="Validation Accuracy" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ROC Curve */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ROC Curve</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={rocCurveData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fpr" label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Area type="monotone" dataKey="tpr" stroke="#3B82F6" fill="#93C5FD" />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-center text-gray-600 mt-4">
              AUC = <span className="font-bold text-blue-600">{modelMetrics.aucRoc}</span>
            </p>
          </div>

          {/* Performance Metrics Table */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
            <div className="space-y-4">
              {[
                { label: 'Accuracy', value: modelMetrics.accuracy, color: 'blue' },
                { label: 'Precision', value: modelMetrics.precision, color: 'green' },
                { label: 'Recall', value: modelMetrics.recall, color: 'purple' },
                { label: 'F1-Score', value: modelMetrics.f1Score, color: 'orange' }
              ].map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-semibold">{metric.label}</span>
                    <span className={`text-${metric.color}-600 font-bold`}>{metric.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-${metric.color}-500 transition-all duration-1000`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Model Version:</span>
                <span className="font-semibold text-gray-900">{modelMetrics.modelVersion}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Last Trained:</span>
                <span className="font-semibold text-gray-900">Feb 13, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Importance */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Feature Importance</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={featureImportance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" label={{ value: 'Importance (%)', position: 'insideBottom', offset: -5 }} />
              <YAxis dataKey="feature" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="importance" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-gray-600 text-sm mt-4 text-center">
            LH/FSH Ratio is the most important feature for PCOS prediction
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
