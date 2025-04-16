import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AAMDashboard from './pages/AAMDashboard';
import AlertDispatchDashboard from './pages/AlertDispatchDashboard';
import AlertResponseDashboard from './pages/AlertResponseDashboard';
import TopAlarmsDashboard from './pages/TopAlarmsDashboard';
import QualityInitiativeDashboard from './pages/QualityInitiativeDashboard';
import ShiftDashboard from './pages/ShiftDashboard';
import IndividualBedDashboard from './pages/IndividualBedDashboard';
import EndUserMetricsDashboard from './pages/EndUserMetricsDashboard';
import AlertEscalationDashboard from './pages/AlertEscalationDashboard';
import PathwaysDashboard from './pages/PathwaysDashboard';
import AuditTrailDashboard from './pages/AuditTrailDashboard';
import UnitTrendDashboard from './pages/UnitTrendDashboard';
import AlarmAlertEscalationDashboard from './pages/AlarmAlertEscalationDashboard';
import LoginPage from './pages/LoginPage';
import { useAuth } from './contexts/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Root route component to handle authentication-based redirects
const RootRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<RootRoute />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/aam" element={
              <ProtectedRoute>
                <AAMDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/alert-dispatch" element={
              <ProtectedRoute>
                <AlertDispatchDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/alert-response" element={
              <ProtectedRoute>
                <AlertResponseDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/top-alarms" element={
              <ProtectedRoute>
                <TopAlarmsDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/quality" element={
              <ProtectedRoute>
                <QualityInitiativeDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/shift" element={
              <ProtectedRoute>
                <ShiftDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/bed" element={
              <ProtectedRoute>
                <IndividualBedDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/user-metrics" element={
              <ProtectedRoute>
                <EndUserMetricsDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/escalation" element={
              <ProtectedRoute>
                <AlertEscalationDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/pathways" element={
              <ProtectedRoute>
                <PathwaysDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/audit" element={
              <ProtectedRoute>
                <AuditTrailDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/unit-trend" element={
              <ProtectedRoute>
                <UnitTrendDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/alarm-escalation" element={
              <ProtectedRoute>
                <AlarmAlertEscalationDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 