import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Shield, TrendingUp, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Activity,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze your health data with 94.5% accuracy'
    },
    {
      icon: Shield,
      title: 'Early Detection',
      description: 'Identify PCOS and cancer risks early for timely intervention and treatment'
    },
    {
      icon: TrendingUp,
      title: 'Personalized Insights',
      description: 'Get customized health recommendations based on your unique profile'
    },
    {
      icon: Users,
      title: 'Expert Backed',
      description: 'Developed using validated medical research and clinical guidelines'
    }
  ];

  const stats = [
    { value: '94.5%', label: 'Accuracy Rate' },
    { value: '10K+', label: 'Predictions Made' },
    { value: '0.96', label: 'AUC-ROC Score' },
    { value: '<10ms', label: 'Response Time' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PCOS Health AI</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <button onClick={() => navigate('/')} className="text-gray-700 hover:text-blue-600 transition">
                Home
              </button>
              <button onClick={() => navigate('/prediction')} className="text-gray-700 hover:text-blue-600 transition">
                Prediction
              </button>
              <button onClick={() => navigate('/admin')} className="text-gray-700 hover:text-blue-600 transition">
                Dashboard
              </button>
              <button onClick={() => navigate('/pipeline')} className="text-gray-700 hover:text-blue-600 transition">
                ML Pipeline
              </button>
            </div>
            <button
              onClick={() => navigate('/prediction')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Early PCOS & Cancer
            <span className="block text-blue-600 mt-2">Risk Detection</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Advanced AI-powered health screening system for early detection of PCOS and associated cancer risks.
            Get personalized insights in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/prediction')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition shadow-lg text-lg font-semibold flex items-center justify-center"
            >
              Start Prediction
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/architecture')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition shadow-lg text-lg font-semibold border-2 border-blue-600"
            >
              View System
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our System?
            </h2>
            <p className="text-xl text-gray-600">
              Cutting-edge technology meets medical expertise
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-xl transition">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and accurate
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Enter Health Data', desc: 'Provide basic health metrics and symptoms' },
              { step: '02', title: 'AI Analysis', desc: 'Our Random Forest model analyzes your data' },
              { step: '03', title: 'Get Results', desc: 'Receive detailed risk assessment and recommendations' }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <div className="text-5xl font-bold text-blue-100 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                  <CheckCircle2 className="w-8 h-8 text-blue-600 mt-4" />
                </div>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-blue-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Check Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Take the first step towards early detection and peace of mind
          </p>
          <button
            onClick={() => navigate('/prediction')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition shadow-lg text-lg font-semibold"
          >
            Start Free Assessment
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 PCOS Health AI. For educational purposes only. Consult healthcare professionals for medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
