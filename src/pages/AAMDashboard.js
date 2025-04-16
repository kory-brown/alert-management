import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Grid,
  Paper,
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Container
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BigNumberChart from '../components/BigNumberChart';
import BarChart from '../components/BarChart';
import ActionBarChart from '../components/ActionBarChart';
import PieChart from '../components/PieChart';
import TableChart from '../components/TableChart';
import LineChart from '../components/LineChart';
import FiltersPanel from '../components/FiltersPanel';
import chartData from '../data/AAMDashboardData.json';
import logo from '../assets/logo.svg';
import AppHeader from '../components/AppHeader';
import { drawerWidth } from '../components/FiltersPanel';

function AAMDashboard() {
  const [startDate, setStartDate] = useState('');
  const [shift, setShift] = useState('');
  const [facility, setFacility] = useState('');
  const [utility, setUtility] = useState('');
  const [severity, setSeverity] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('last7Days');
  const [selectedUnits, setSelectedUnits] = useState(['All Units']);
  const [selectedDestinations, setSelectedDestinations] = useState(['All Destinations']);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');

  const handleApplyFilters = () => {
    console.log('Applying filters:', {
      startDate,
      shift,
      facility,
      utility,
      severity,
      category
    });
  };

  const pageTitle = "AAM Dashboard";
  
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };


  {/* PAGE TEMPLATE COMPONENTS */}
  return (
    /* NAVIGATION HEADER BAR */
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '1024px' }}>
      <AppHeader title={pageTitle} />
      <Toolbar />
      <Box sx={{ display: 'flex', flex: 1, position: 'relative' }}>
      {/* FILTERS PANEL */}
        <Box sx={{ 
          display: 'flex',
          transition: 'width 0.3s ease',
          width: isFilterPanelOpen ? { md: drawerWidth } : '0px',
          position: 'fixed',
          overflow: 'hidden',
          top: 88,
          bottom: 0,
          left: 0,
          zIndex: 1200
        }}>
          <Paper 
            sx={{ 
              width: drawerWidth,
              flexShrink: 0,
              mr: 2,
              height: 'calc(100vh - 100px)',
              backgroundColor: '#ffffff',
              transition: 'transform 0.3s ease',
              transform: isFilterPanelOpen ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
              boxShadow: '0px 3px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column'
            }}
            elevation={2}
          >
            <FiltersPanel
              startDate={startDate}
              shift={shift}
              facility={facility}
              utility={utility}
              severity={severity}
              category={category}
              onStartDateChange={setStartDate}
              onShiftChange={setShift}
              onFacilityChange={setFacility}
              onUtilityChange={setUtility}
              onSeverityChange={setSeverity}
              onCategoryChange={setCategory}
              onApplyFilters={handleApplyFilters}
              isOpen={isFilterPanelOpen}
              onToggle={toggleFilterPanel}
            />
          </Paper>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            transition: 'margin-left 0.3s ease',
            marginLeft: isFilterPanelOpen ? `${drawerWidth}px` : 0,
            width: '100%',
            minWidth: isFilterPanelOpen ? `${1024 - drawerWidth}px` : '1024px',
            minHeight: 'calc(100vh - 88px)',
            overflowX: 'auto',
            position: 'relative'
          }}
        >
          {!isFilterPanelOpen && (
            <IconButton
              onClick={toggleFilterPanel}
              sx={{
                position: 'absolute',
                left: 0,
                top: '16px',
                backgroundColor: '#1aafe6',
                border: '1px solid #e0e0e0',
                borderLeft: 'none',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                boxShadow: '2px 0 4px rgba(0,0,0,0.2)',
                width: '32px',
                height: '48px',
                minWidth: '32px',
                padding: 0,
                '&:hover': {
                  backgroundColor: '#1590c0'
                },
                zIndex: 1,
                color: 'white'
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          )}


          {/* PAGE CHART COMPONENTS */}

          {/* Big Number Charts */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <BigNumberChart {...chartData.bigNumbers.totalAlarms} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart {...chartData.bigNumbers.totalAlerts} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart {...chartData.bigNumbers.avgAlarmDuration} />
            </Grid>
          </Grid>

          {/* Severity and Category Charts */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 400 }}>
                <BarChart 
                  title={chartData.barCharts.bySeverity.title}
                  data={chartData.barCharts.bySeverity.data}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 400 }}>
                <BarChart 
                  title={chartData.barCharts.byCategory.title}
                  data={chartData.barCharts.byCategory.data}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Daily Bar Chart */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <BarChart 
                  title={chartData.barCharts.alarmsAndAlerts.title}
                  data={chartData.barCharts.alarmsAndAlerts.data}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Daily Trend Line Chart */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart
                  title={chartData.lineCharts.alarmsAndAlertsDailyTrend.title}
                  data={chartData.lineCharts.alarmsAndAlertsDailyTrend.data}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Severity Resolve Time Trend Line Chart */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart
                  title="Average Alarm Resolve Time by Severity Daily Trend"
                  data={chartData.lineCharts.avgAlarmResolveTimeBySeverity.data}
                  severityChart={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Category Trend Line Chart */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart
                  title="Average Total Alarms by Category Daily Trend"
                  data={chartData.lineCharts.avgAlarmsByCategoryDailyTrend.data}
                  categoryChart={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Alert Dispatch Workflows Section */}
          <Typography 
            variant="h5" 
            sx={{ 
              mt: 2.5, 
              mb: 2, 
              fontWeight: 600,
              color: '#2F2F2F'
            }}
          >
            Alert Dispatch Workflows
          </Typography>

          {/* Manually Dispatched Alerts Row */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box sx={{ height: 300 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.manuallyDispatchedAlerts.title}
                  value={chartData.bigNumbers.manuallyDispatchedAlerts.value}
                  label={chartData.bigNumbers.manuallyDispatchedAlerts.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ height: 300 }}>
                <BarChart
                  title={chartData.barCharts.manuallyDispatchedAlerts.title}
                  data={chartData.barCharts.manuallyDispatchedAlerts.data}
                  xAxisKey="date"
                  yAxisKeys={["manuallyDispatched"]}
                  yAxisLabels={["Manually Dispatched Alerts"]}
                  colors={["#667275"]}
                  showValueLabels={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Alarms Delayed Row */}
          <Grid container spacing={3} sx={{ mt: 2.5 }}>
            <Grid item xs={12} md={3}>
              <Box sx={{ height: 300 }}>
                <BigNumberChart 
                  title="Total Number of Alarms Delayed"
                  value={378}
                  label="Total Delayed Alarms"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ height: 300 }}>
                <BarChart 
                  title="Total Number of Alarms Delayed by Day"
                  data={chartData.barCharts.delayedAlarms.data}
                  xAxisKey="date"
                  yAxisKeys={["delayed"]}
                  yAxisLabels={["Delayed Alarms"]}
                  colors={["#667275"]}
                  showValueLabels={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Auto Dispatched Alerts Row */}
          <Grid container spacing={3} sx={{ mt: 2.5 }}>
            <Grid item xs={12} md={3}>
              <Box sx={{ height: 300 }}>
                <BigNumberChart 
                  title="Total Number of Auto Dispatched Alerts"
                  value={471}
                  label="Total Auto Dispatched Alerts"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ height: 300 }}>
                <BarChart 
                  title="Auto Dispatched Alerts by Day"
                  data={chartData.barCharts.autoDispatchedAlerts.data}
                  xAxisKey="date"
                  yAxisKeys={["autoDispatched"]}
                  yAxisLabels={["Auto Dispatched Alerts"]}
                  colors={["#667275"]}
                  showValueLabels={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Total Number of Alarms Self Resolved/Not Sustained Row */}
          <Grid container spacing={3} sx={{ mt: 2.5 }}>
            <Grid item xs={12} md={3}>
              <Box sx={{ height: 300 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.selfResolvedAlarms.title}
                  value={chartData.bigNumbers.selfResolvedAlarms.value}
                  label={chartData.bigNumbers.selfResolvedAlarms.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ height: 300 }}>
                <BarChart
                  title={chartData.barCharts.selfResolvedAlarms.title}
                  data={chartData.barCharts.selfResolvedAlarms.data}
                  xAxisKey="date"
                  yAxisKeys={["selfResolved"]}
                  yAxisLabels={["Self Resolved/Not Sustained Alarms"]}
                  colors={["#667275"]}
                  showValueLabels={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Total Number of Alarms with Hold Reoccurence Row */}
          <Grid container spacing={3} sx={{ mt: 2.5 }}>
            <Grid item xs={12} md={3}>
              <Box sx={{ height: 300 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.holdReoccurenceAlarms.title}
                  value={chartData.bigNumbers.holdReoccurenceAlarms.value}
                  label={chartData.bigNumbers.holdReoccurenceAlarms.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ height: 300 }}>
                <BarChart
                  title={chartData.barCharts.holdReoccurenceAlarms.title}
                  data={chartData.barCharts.holdReoccurenceAlarms.data}
                  xAxisKey="date"
                  yAxisKeys={["holdReoccurence"]}
                  yAxisLabels={["Hold Reoccurence Alarms"]}
                  colors={["#667275"]}
                  showValueLabels={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Alarm Queue Interval Subsection */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 6,
              mb: 3,
              gap: 2
            }}
          >
            <Typography 
              variant="subtitle2"
              sx={{ 
                fontWeight: 500,
                color: '#2F2F2F',
                whiteSpace: 'nowrap'
              }}
            >
              Alarm Queue Interval
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                height: '1px',
                backgroundColor: '#2F2F2F',
                opacity: 0.5
              }}
            />
          </Box>

          {/* Alert Metrics */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <BigNumberChart
                title="Average Suspend Time"
                value={30}
                label="Avg Suspend Time (sec)"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart
                title="Average Delayed Time"
                value={24}
                label="Avg Delayed Time (sec)"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart
                title="Average Not Sustained Time"
                value={13}
                label="Avg Not Sustained Time (sec)"
              />
            </Grid>
          </Grid>

          {/* End-User Response Subsection */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 3,
              mb: 3,
              gap: 2
            }}
          >
            <Typography 
              variant="subtitle2"
              sx={{ 
                fontWeight: 500,
                color: '#2F2F2F',
                whiteSpace: 'nowrap'
              }}
            >
              Alert Response
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                height: '1px',
                backgroundColor: '#2F2F2F',
                opacity: 0.5
              }}
            />
          </Box>

          {/* Pie Charts Row */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <PieChart
                title="End User Response"
                data={[
                  { name: 'Manually Escalated', value: 40 },
                  { name: 'Auto Escalated', value: 35 },
                  { name: 'Not Sustained', value: 25 }
                ]}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PieChart
                title="Percentage of Alert Response"
                data={[
                  { name: 'Response 1', value: 30 },
                  { name: 'Response 2', value: 25 },
                  { name: 'Response 3', value: 20 },
                  { name: 'Auto / None', value: 25 }
                ]}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <PieChart
                title="Alert Responses by Destination"
                data={[
                  { name: 'D1', value: 30 },
                  { name: 'D2', value: 25 },
                  { name: 'D3', value: 25 },
                  { name: 'D4', value: 20 }
                ]}
              />
            </Grid>
          </Grid>

          {/* Action Bar Chart */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <ActionBarChart 
                  title={chartData.barCharts.byActions.title}
                  data={chartData.barCharts.byActions.data}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Table Chart */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <TableChart
                title="Alarm Label Detail"
                data={[
                  {
                    facility: "Memorial Hospital",
                    unit: "ICU-1",
                    alarmLabel: "Ventricular Tachycardia",
                    category: "Arrhythmia",
                    priority: "High",
                    avgDuration: 45,
                    manualEscalations: 12,
                    autoEscalations: 8,
                    notSustained: 5,
                    avgAlarmDuration: 120,
                    avgADEscalationTime: 30,
                    snippetsCreated: 15,
                    softKeyResponses: "Option 1",
                    destinations: "D1",
                    avgResolutionDuration: 180,
                    autoAfterDelay: 3
                  },
                  {
                    facility: "Memorial Hospital",
                    unit: "ICU-2",
                    alarmLabel: "Oxygen Desaturation",
                    category: "Other",
                    priority: "High",
                    avgDuration: 35,
                    manualEscalations: 15,
                    autoEscalations: 10,
                    notSustained: 8,
                    avgAlarmDuration: 90,
                    avgADEscalationTime: 25,
                    snippetsCreated: 12,
                    softKeyResponses: "Option 2",
                    destinations: "D2",
                    avgResolutionDuration: 150,
                    autoAfterDelay: 5
                  },
                  {
                    facility: "Memorial Hospital",
                    unit: "CCU",
                    alarmLabel: "Lead Off",
                    category: "System",
                    priority: "Medium",
                    avgDuration: 25,
                    manualEscalations: 8,
                    autoEscalations: 12,
                    notSustained: 6,
                    avgAlarmDuration: 75,
                    avgADEscalationTime: 20,
                    snippetsCreated: 10,
                    softKeyResponses: "Option 3",
                    destinations: "D3",
                    avgResolutionDuration: 120,
                    autoAfterDelay: 4
                  },
                  {
                    facility: "City General",
                    unit: "ICU-1",
                    alarmLabel: "Ventricular Fibrillation",
                    category: "Arrhythmia",
                    priority: "High",
                    avgDuration: 50,
                    manualEscalations: 18,
                    autoEscalations: 6,
                    notSustained: 4,
                    avgAlarmDuration: 140,
                    avgADEscalationTime: 35,
                    snippetsCreated: 20,
                    softKeyResponses: "Option 1",
                    destinations: "D1",
                    avgResolutionDuration: 200,
                    autoAfterDelay: 2
                  },
                  {
                    facility: "City General",
                    unit: "CCU",
                    alarmLabel: "Bradycardia",
                    category: "Arrhythmia",
                    priority: "High",
                    avgDuration: 40,
                    manualEscalations: 14,
                    autoEscalations: 9,
                    notSustained: 7,
                    avgAlarmDuration: 110,
                    avgADEscalationTime: 28,
                    snippetsCreated: 16,
                    softKeyResponses: "Option 2",
                    destinations: "D2",
                    avgResolutionDuration: 170,
                    autoAfterDelay: 4
                  },
                  {
                    facility: "City General",
                    unit: "NICU",
                    alarmLabel: "Apnea",
                    category: "Other",
                    priority: "High",
                    avgDuration: 30,
                    manualEscalations: 20,
                    autoEscalations: 15,
                    notSustained: 10,
                    avgAlarmDuration: 80,
                    avgADEscalationTime: 22,
                    snippetsCreated: 25,
                    softKeyResponses: "Option 1",
                    destinations: "D4",
                    avgResolutionDuration: 130,
                    autoAfterDelay: 6
                  },
                  {
                    facility: "County Medical",
                    unit: "ICU-1",
                    alarmLabel: "High Heart Rate",
                    category: "Other",
                    priority: "Medium",
                    avgDuration: 28,
                    manualEscalations: 10,
                    autoEscalations: 14,
                    notSustained: 8,
                    avgAlarmDuration: 70,
                    avgADEscalationTime: 18,
                    snippetsCreated: 12,
                    softKeyResponses: "Option 3",
                    destinations: "D2",
                    avgResolutionDuration: 110,
                    autoAfterDelay: 5
                  },
                  {
                    facility: "County Medical",
                    unit: "CCU",
                    alarmLabel: "ST Elevation",
                    category: "Arrhythmia",
                    priority: "High",
                    avgDuration: 55,
                    manualEscalations: 22,
                    autoEscalations: 5,
                    notSustained: 3,
                    avgAlarmDuration: 160,
                    avgADEscalationTime: 40,
                    snippetsCreated: 28,
                    softKeyResponses: "Option 1",
                    destinations: "D1",
                    avgResolutionDuration: 220,
                    autoAfterDelay: 2
                  },
                  {
                    facility: "County Medical",
                    unit: "PICU",
                    alarmLabel: "SpO2 Probe Off",
                    category: "System",
                    priority: "Low",
                    avgDuration: 15,
                    manualEscalations: 5,
                    autoEscalations: 18,
                    notSustained: 12,
                    avgAlarmDuration: 45,
                    avgADEscalationTime: 12,
                    snippetsCreated: 8,
                    softKeyResponses: "Option 2",
                    destinations: "D3",
                    avgResolutionDuration: 80,
                    autoAfterDelay: 8
                  },
                  {
                    facility: "Memorial Hospital",
                    unit: "PICU",
                    alarmLabel: "Low Blood Pressure",
                    category: "Other",
                    priority: "High",
                    avgDuration: 42,
                    manualEscalations: 16,
                    autoEscalations: 7,
                    notSustained: 4,
                    avgAlarmDuration: 130,
                    avgADEscalationTime: 32,
                    snippetsCreated: 18,
                    softKeyResponses: "Option 1",
                    destinations: "D2",
                    avgResolutionDuration: 190,
                    autoAfterDelay: 3
                  },
                  {
                    facility: "Memorial Hospital",
                    unit: "NICU",
                    alarmLabel: "High Respiratory Rate",
                    category: "Other",
                    priority: "Medium",
                    avgDuration: 32,
                    manualEscalations: 11,
                    autoEscalations: 13,
                    notSustained: 7,
                    avgAlarmDuration: 85,
                    avgADEscalationTime: 24,
                    snippetsCreated: 14,
                    softKeyResponses: "Option 3",
                    destinations: "D4",
                    avgResolutionDuration: 140,
                    autoAfterDelay: 5
                  },
                  {
                    facility: "City General",
                    unit: "ICU-2",
                    alarmLabel: "Asystole",
                    category: "Arrhythmia",
                    priority: "High",
                    avgDuration: 60,
                    manualEscalations: 25,
                    autoEscalations: 4,
                    notSustained: 2,
                    avgAlarmDuration: 180,
                    avgADEscalationTime: 45,
                    snippetsCreated: 30,
                    softKeyResponses: "Option 1",
                    destinations: "D1",
                    avgResolutionDuration: 240,
                    autoAfterDelay: 1
                  },
                  {
                    facility: "County Medical",
                    unit: "ICU-2",
                    alarmLabel: "ECG Artifact",
                    category: "System",
                    priority: "Low",
                    avgDuration: 20,
                    manualEscalations: 6,
                    autoEscalations: 16,
                    notSustained: 10,
                    avgAlarmDuration: 55,
                    avgADEscalationTime: 15,
                    snippetsCreated: 9,
                    softKeyResponses: "Option 2",
                    destinations: "D3",
                    avgResolutionDuration: 90,
                    autoAfterDelay: 7
                  },
                  {
                    facility: "Memorial Hospital",
                    unit: "ICU-1",
                    alarmLabel: "High Temperature",
                    category: "Other",
                    priority: "Medium",
                    avgDuration: 38,
                    manualEscalations: 13,
                    autoEscalations: 11,
                    notSustained: 6,
                    avgAlarmDuration: 95,
                    avgADEscalationTime: 26,
                    snippetsCreated: 16,
                    softKeyResponses: "Option 3",
                    destinations: "D2",
                    avgResolutionDuration: 160,
                    autoAfterDelay: 4
                  },
                  {
                    facility: "City General",
                    unit: "PICU",
                    alarmLabel: "Low Heart Rate",
                    category: "Other",
                    priority: "High",
                    avgDuration: 45,
                    manualEscalations: 17,
                    autoEscalations: 8,
                    notSustained: 5,
                    avgAlarmDuration: 125,
                    avgADEscalationTime: 33,
                    snippetsCreated: 19,
                    softKeyResponses: "Option 1",
                    destinations: "D1",
                    avgResolutionDuration: 185,
                    autoAfterDelay: 3
                  },
                  {
                    facility: "County Medical",
                    unit: "NICU",
                    alarmLabel: "Low Respiratory Rate",
                    category: "Other",
                    priority: "High",
                    avgDuration: 36,
                    manualEscalations: 19,
                    autoEscalations: 9,
                    notSustained: 6,
                    avgAlarmDuration: 105,
                    avgADEscalationTime: 29,
                    snippetsCreated: 22,
                    softKeyResponses: "Option 2",
                    destinations: "D4",
                    avgResolutionDuration: 175,
                    autoAfterDelay: 4
                  },
                  {
                    facility: "Memorial Hospital",
                    unit: "CCU",
                    alarmLabel: "ST Depression",
                    category: "Arrhythmia",
                    priority: "High",
                    avgDuration: 52,
                    manualEscalations: 21,
                    autoEscalations: 6,
                    notSustained: 3,
                    avgAlarmDuration: 150,
                    avgADEscalationTime: 38,
                    snippetsCreated: 24,
                    softKeyResponses: "Option 1",
                    destinations: "D1",
                    avgResolutionDuration: 210,
                    autoAfterDelay: 2
                  },
                  {
                    facility: "City General",
                    unit: "ICU-1",
                    alarmLabel: "Sensor Disconnected",
                    category: "System",
                    priority: "Low",
                    avgDuration: 18,
                    manualEscalations: 7,
                    autoEscalations: 15,
                    notSustained: 9,
                    avgAlarmDuration: 50,
                    avgADEscalationTime: 14,
                    snippetsCreated: 11,
                    softKeyResponses: "Option 3",
                    destinations: "D3",
                    avgResolutionDuration: 85,
                    autoAfterDelay: 6
                  },
                  {
                    facility: "County Medical",
                    unit: "ICU-1",
                    alarmLabel: "NIBP Measurement Failed",
                    category: "System",
                    priority: "Low",
                    avgDuration: 22,
                    manualEscalations: 8,
                    autoEscalations: 14,
                    notSustained: 8,
                    avgAlarmDuration: 60,
                    avgADEscalationTime: 16,
                    snippetsCreated: 13,
                    softKeyResponses: "Option 2",
                    destinations: "D2",
                    avgResolutionDuration: 95,
                    autoAfterDelay: 5
                  },
                  {
                    facility: "Memorial Hospital",
                    unit: "ICU-2",
                    alarmLabel: "ICP High",
                    category: "Other",
                    priority: "High",
                    avgDuration: 48,
                    manualEscalations: 20,
                    autoEscalations: 7,
                    notSustained: 4,
                    avgAlarmDuration: 135,
                    avgADEscalationTime: 34,
                    snippetsCreated: 23,
                    softKeyResponses: "Option 1",
                    destinations: "D1",
                    avgResolutionDuration: 195,
                    autoAfterDelay: 3
                  },
                  {
                    facility: "City General",
                    unit: "CCU",
                    alarmLabel: "EtCO2 High",
                    category: "Other",
                    priority: "Medium",
                    avgDuration: 34,
                    manualEscalations: 12,
                    autoEscalations: 12,
                    notSustained: 7,
                    avgAlarmDuration: 88,
                    avgADEscalationTime: 23,
                    snippetsCreated: 15,
                    softKeyResponses: "Option 3",
                    destinations: "D4",
                    avgResolutionDuration: 145,
                    autoAfterDelay: 5
                  },
                  {
                    facility: "County Medical",
                    unit: "PICU",
                    alarmLabel: "EtCO2 Low",
                    category: "Other",
                    priority: "Medium",
                    avgDuration: 30,
                    manualEscalations: 11,
                    autoEscalations: 13,
                    notSustained: 8,
                    avgAlarmDuration: 82,
                    avgADEscalationTime: 21,
                    snippetsCreated: 14,
                    softKeyResponses: "Option 2",
                    destinations: "D3",
                    avgResolutionDuration: 135,
                    autoAfterDelay: 6
                  },
                  {
                    facility: "Memorial Hospital",
                    unit: "NICU",
                    alarmLabel: "Low Temperature",
                    category: "Other",
                    priority: "Medium",
                    avgDuration: 33,
                    manualEscalations: 10,
                    autoEscalations: 11,
                    notSustained: 6,
                    avgAlarmDuration: 85,
                    avgADEscalationTime: 24,
                    snippetsCreated: 13,
                    softKeyResponses: "Option 1",
                    destinations: "D2",
                    avgResolutionDuration: 140,
                    autoAfterDelay: 4
                  }
                ]}
              />
            </Grid>
          </Grid>

          {/* Destination - Alert Response Detail Table Chart */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <TableChart
                  title={chartData.tableCharts.destinationAlertResponse.title}
                  data={chartData.tableCharts.destinationAlertResponse.data}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default AAMDashboard; 