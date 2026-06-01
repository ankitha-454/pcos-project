
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import PredictionForm from './components/PredictionForm';
import ResultsPage from './components/ResultsPage';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// If these files do not exist yet, remove these imports temporarily
// import MLPipelineDiagram from './components/MLPipelineDiagram';
// import ArchitectureDiagram from './components/ArchitectureDiagram';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/register',
    element: <Register />,
  },

  {
    path: '/',
    element: (
      <ProtectedRoute>
        <LandingPage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/prediction',
    element: (
      <ProtectedRoute>
        <PredictionForm />
      </ProtectedRoute>
    ),
  },

  {
    path: '/results',
    element: (
      <ProtectedRoute>
        <ResultsPage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/admin',
    element: (
      <ProtectedRoute requireAdmin={true}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },

  // Uncomment later if you create these pages

  /*
  {
    path: '/pipeline',
    element: (
      <ProtectedRoute>
        <MLPipelineDiagram />
      </ProtectedRoute>
    ),
  },

  {
    path: '/architecture',
    element: (
      <ProtectedRoute>
        <ArchitectureDiagram />
      </ProtectedRoute>
    ),
  },
  */

  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

