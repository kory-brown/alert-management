import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/aam" element={<AAMDashboard />} />
          <Route path="/dashboard/alert-dispatch" element={<AlertDispatchDashboard />} />
          <Route path="/dashboard/alert-response" element={<AlertResponseDashboard />} />
          <Route path="/dashboard/top-alarms" element={<TopAlarmsDashboard />} />
          <Route path="/dashboard/quality" element={<QualityInitiativeDashboard />} />
          <Route path="/dashboard/shift" element={<ShiftDashboard />} />
          <Route path="/dashboard/bed" element={<IndividualBedDashboard />} />
          <Route path="/dashboard/user-metrics" element={<EndUserMetricsDashboard />} />
          <Route path="/dashboard/escalation" element={<AlertEscalationDashboard />} />
          <Route path="/dashboard/pathways" element={<PathwaysDashboard />} />
          <Route path="/dashboard/audit" element={<AuditTrailDashboard />} />
          <Route path="/dashboard/unit-trend" element={<UnitTrendDashboard />} />
          <Route path="/dashboard/alarm-escalation" element={<AlarmAlertEscalationDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 