import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { MyTasks } from './pages/MyTasks';
import { Workflows } from './pages/Workflows';
import { Compliance } from './pages/Compliance';
import { ThirdParties } from './pages/ThirdParties';
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
        <Route index element={<Home />} />
        <Route path="my-tasks" element={<MyTasks />} />
        <Route path="workflows" element={<Workflows />} />
        <Route path="compliance" element={<Compliance />} />
        <Route path="third-parties" element={<ThirdParties />} />
        <Route path="incidents" element={<CaseDashboard />} />
        <Route path="policies-training" element={<DataConnector />} />
        <Route path="integrity-culture" element={<RulesStudio />} />
        <Route path="esg-reporting" element={<Metrics />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

