// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Activity, AlertCircle } from 'lucide-react';

// const PredictionForm = ({ setPredictionResult, setFormData }) => {
//   const navigate = useNavigate();
//   const [formValues, setFormValues] = useState({
//     age: '',
//     bmi: '',
//     cycleLength: '',
//     lhLevel: '',
//     fshLevel: '',
//     insulinLevel: '',
//     acneSeverity: '0',
//     hirsutismScore: '0'
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formValues.age || formValues.age < 18 || formValues.age > 100) {
//       newErrors.age = 'Age must be between 18 and 100';
//     }
//     if (!formValues.bmi || formValues.bmi < 10 || formValues.bmi > 60) {
//       newErrors.bmi = 'BMI must be between 10 and 60';
//     }
//     if (!formValues.cycleLength || formValues.cycleLength < 20 || formValues.cycleLength > 90) {
//       newErrors.cycleLength = 'Cycle length must be between 20 and 90 days';
//     }
//     if (!formValues.lhLevel || formValues.lhLevel < 0) {
//       newErrors.lhLevel = 'LH level must be positive';
//     }
//     if (!formValues.fshLevel || formValues.fshLevel <= 0) {
//       newErrors.fshLevel = 'FSH level must be greater than 0';
//     }
//     if (!formValues.insulinLevel || formValues.insulinLevel < 0) {
//       newErrors.insulinLevel = 'Insulin level must be positive';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const mockPredict = (data) => {
//     // Mock prediction logic (matches backend logic)
//     const age = parseFloat(data.age);
//     const bmi = parseFloat(data.bmi);
//     const cycleLength = parseFloat(data.cycleLength);
//     const lhLevel = parseFloat(data.lhLevel);
//     const fshLevel = parseFloat(data.fshLevel);
//     const insulinLevel = parseFloat(data.insulinLevel);
//     const acneSeverity = parseInt(data.acneSeverity);
//     const hirsutismScore = parseInt(data.hirsutismScore);

//     const lhFshRatio = lhLevel / fshLevel;

//     // Calculate PCOS risk
//     let pcosRisk = 0;
    
//     if (cycleLength > 35) pcosRisk += 25;
//     if (lhFshRatio > 2) pcosRisk += 30;
//     if (acneSeverity >= 2 || hirsutismScore >= 2) pcosRisk += 20;
//     if (bmi > 27) pcosRisk += 15;
//     if (insulinLevel > 18) pcosRisk += 10;

//     const pcosRiskPercentage = Math.min(100, pcosRisk);
    
//     const pcosCategory = pcosRiskPercentage < 30 ? 'Low' : 
//                         pcosRiskPercentage < 60 ? 'Moderate' : 'High';

//     // Calculate cancer risk
//     const pcosFactor = (pcosRiskPercentage / 100) * 0.25;
//     const ageFactor = age > 40 ? 0.15 : age > 30 ? 0.08 : 0.03;
//     const bmiFactor = bmi > 30 ? 0.1 : bmi > 25 ? 0.05 : 0;
//     const insulinFactor = insulinLevel > 20 ? 0.08 : insulinLevel > 15 ? 0.04 : 0;
    
//     const cancerRisk = Math.min(100, (pcosFactor + ageFactor + bmiFactor + insulinFactor) * 100);

//     return {
//       pcosRisk: parseFloat(pcosRiskPercentage.toFixed(2)),
//       pcosCategory: pcosCategory,
//       cancerRisk: parseFloat(cancerRisk.toFixed(2)),
//       timestamp: new Date().toISOString(),
//       confidence: parseFloat((85 + Math.random() * 10).toFixed(2)),
//       lhFshRatio: parseFloat(lhFshRatio.toFixed(2))
//     };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const result = mockPredict(formValues);
      
//       setPredictionResult(result);
//       setFormData(formValues);
//       navigate('/results');
//     } catch (error) {
//       console.error('Prediction error:', error);
//       setErrors({ submit: 'Failed to make prediction. Please try again.' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const inputFields = [
//     { name: 'age', label: 'Age', type: 'number', unit: 'years', placeholder: 'e.g., 28', step: '1' },
//     { name: 'bmi', label: 'BMI', type: 'number', unit: 'kg/m²', placeholder: 'e.g., 24.5', step: '0.1' },
//     { name: 'cycleLength', label: 'Menstrual Cycle Length', type: 'number', unit: 'days', placeholder: 'e.g., 28', step: '1' },
//     { name: 'lhLevel', label: 'LH Level', type: 'number', unit: 'mIU/mL', placeholder: 'e.g., 8.5', step: '0.1' },
//     { name: 'fshLevel', label: 'FSH Level', type: 'number', unit: 'mIU/mL', placeholder: 'e.g., 6.2', step: '0.1' },
//     { name: 'insulinLevel', label: 'Insulin Level', type: 'number', unit: 'µU/mL', placeholder: 'e.g., 12.5', step: '0.1' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate('/')}
//             className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Back to Home
//           </button>
//           <div className="flex items-center space-x-3 mb-4">
//             <Activity className="w-10 h-10 text-blue-600" />
//             <h1 className="text-4xl font-bold text-gray-900">Health Assessment</h1>
//           </div>
//           <p className="text-gray-600 text-lg">
//             Enter your health information below for PCOS and cancer risk prediction
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
//           {/* Basic Health Metrics */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mr-3">1</div>
//               Basic Health Metrics
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               {inputFields.map((field) => (
//                 <div key={field.name}>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     {field.label}
//                     <span className="text-gray-500 font-normal ml-2">({field.unit})</span>
//                   </label>
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     value={formValues[field.name]}
//                     onChange={handleChange}
//                     placeholder={field.placeholder}
//                     step={field.step}
//                     className={`w-full px-4 py-3 rounded-lg border-2 ${
//                       errors[field.name] ? 'border-red-500' : 'border-gray-300'
//                     } focus:border-blue-500 focus:outline-none transition`}
//                   />
//                   {errors[field.name] && (
//                     <p className="text-red-500 text-sm mt-1 flex items-center">
//                       <AlertCircle className="w-4 h-4 mr-1" />
//                       {errors[field.name]}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Clinical Symptoms */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mr-3">2</div>
//               Clinical Symptoms
//             </h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Acne Severity */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Acne Severity
//                 </label>
//                 <select
//                   name="acneSeverity"
//                   value={formValues.acneSeverity}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition"
//                 >
//                   <option value="0">0 - None</option>
//                   <option value="1">1 - Mild</option>
//                   <option value="2">2 - Moderate</option>
//                   <option value="3">3 - Severe</option>
//                 </select>
//               </div>

//               {/* Hirsutism Score */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Hirsutism Score
//                 </label>
//                 <select
//                   name="hirsutismScore"
//                   value={formValues.hirsutismScore}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition"
//                 >
//                   <option value="0">0 - None</option>
//                   <option value="1">1 - Mild</option>
//                   <option value="2">2 - Moderate</option>
//                   <option value="3">3 - Severe</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Submit Error */}
//           {errors.submit && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
//               <AlertCircle className="w-5 h-5 mr-2" />
//               {errors.submit}
//             </div>
//           )}

//           {/* Info Note */}
//           <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//             <p className="text-blue-800 text-sm">
//               <strong>Note:</strong> All fields are required. Please ensure all values are within the specified ranges.
//             </p>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-4 rounded-lg font-semibold text-lg transition ${
//               isLoading
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
//             }`}
//           >
//             {isLoading ? (
//               <span className="flex items-center justify-center">
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                 Analyzing...
//               </span>
//             ) : (
//               'Predict Risk'
//             )}
//           </button>
//         </form>

//         {/* Disclaimer */}
//         <div className="mt-6 text-center text-gray-500 text-sm">
//           This tool is for educational purposes only. Always consult with healthcare professionals for medical advice.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PredictionForm;
