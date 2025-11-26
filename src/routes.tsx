import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { CaseDashboard } from './pages/CaseDashboard';
import { RulesStudio } from './pages/RulesStudio';
import { Metrics } from './pages/Metrics';
import { DataConnector } from './pages/DataConnector';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Metrics />} />
        <Route path="case" element={<CaseDashboard />} />
        <Route path="rules" element={<RulesStudio />} />
        <Route path="data-connector" element={<DataConnector />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

