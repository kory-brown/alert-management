import React, { useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FiltersPanel from '../components/FiltersPanel';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BigNumberChart from '../components/BigNumberChart';
import alertDispatchData from '../data/AlertDispatchData.json';
import alarmAlertManagementData from '../data/AlarmAlertManagementData.json';
import logo from '../assets/logo.svg';
import LineChart from '../components/LineChart';
import TrendLineChartByHour from '../components/TrendLineChartByHour';
import AlarmTypesBarChart from '../components/AlarmTypesBarChart';
import BarChart from '../components/BarChart';

const drawerWidth = 320;

const AlertDispatchDashboard = () => {
  // Filter state
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [shift, setShift] = useState('');
  const [facility, setFacility] = useState('');
  const [utility, setUtility] = useState('');
  const [severity, setSeverity] = useState('');
  const [category, setCategory] = useState('');

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '1024px' }}>
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={1}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          minWidth: '1024px'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              component={Link}
              to="/"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <DashboardIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div">
              Alert Dispatch Dashboard
            </Typography>
          </Box>
          <img 
            src={logo} 
            alt="Logo" 
            style={{ 
              height: '40px',
              marginLeft: 'auto'
            }} 
          />
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Box sx={{ display: 'flex', flex: 1, position: 'relative' }}>
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <BigNumberChart
                title={alertDispatchData.bigNumbers.alarmsInQueue.title}
                value={alertDispatchData.bigNumbers.alarmsInQueue.value}
                label={alertDispatchData.bigNumbers.alarmsInQueue.label}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart
                title={alertDispatchData.bigNumbers.delayedAlarms.title}
                value={alertDispatchData.bigNumbers.delayedAlarms.value}
                label={alertDispatchData.bigNumbers.delayedAlarms.label}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart
                title={alertDispatchData.bigNumbers.avgAlarmSuspendTime.title}
                value={alertDispatchData.bigNumbers.avgAlarmSuspendTime.value}
                label={alertDispatchData.bigNumbers.avgAlarmSuspendTime.label}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <BigNumberChart
                title={alertDispatchData.bigNumbers.alarmsNotSustained.title}
                value={alertDispatchData.bigNumbers.alarmsNotSustained.value}
                label={alertDispatchData.bigNumbers.alarmsNotSustained.label}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <BigNumberChart
                title={alertDispatchData.bigNumbers.manuallyEscalatedAlarms.title}
                value={alertDispatchData.bigNumbers.manuallyEscalatedAlarms.value}
                label={alertDispatchData.bigNumbers.manuallyEscalatedAlarms.label}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <BigNumberChart
                title={alertDispatchData.bigNumbers.autoEscalatedAlarms.title}
                value={alertDispatchData.bigNumbers.autoEscalatedAlarms.value}
                label={alertDispatchData.bigNumbers.autoEscalatedAlarms.label}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <BigNumberChart
                title={alertDispatchData.bigNumbers.snippetsCreated.title}
                value={alertDispatchData.bigNumbers.snippetsCreated.value}
                label={alertDispatchData.bigNumbers.snippetsCreated.label}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <LineChart
                title={alertDispatchData.lineCharts.alarmsAndAlertsDailyTrend.title}
                data={alertDispatchData.lineCharts.alarmsAndAlertsDailyTrend.data}
                xAxisKey="date"
                yAxisKeys={["alarms", "alerts"]}
                yAxisLabels={["Alarms", "Alerts"]}
                colors={["#1976d2", "#2e7d32"]}
                updateInterval={alertDispatchData.lineCharts.alarmsAndAlertsDailyTrend.updateInterval}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <TrendLineChartByHour
                  title={alertDispatchData.lineCharts.alarmsAndAlertsHourlyTrend.title}
                  data={alertDispatchData.lineCharts.alarmsAndAlertsHourlyTrend.data}
                />
              </Paper>
            </Grid>
          </Grid>

          {/* Manually Dispatched Alerts Row */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={3}>
              <BigNumberChart {...alarmAlertManagementData.bigNumbers.manuallyDispatchedAlerts} />
            </Grid>
            <Grid item xs={12} md={9}>
              <Paper sx={{ p: 2, height: 400 }}>
                <BarChart 
                  title={alarmAlertManagementData.barCharts.manuallyDispatchedAlerts.title}
                  data={alarmAlertManagementData.barCharts.manuallyDispatchedAlerts.data}
                  xAxisKey="date"
                  yAxisKeys={["manuallyDispatched"]}
                  yAxisLabels={["Manually Dispatched Alerts"]}
                  colors={["#1aafe6"]}
                  showValueLabels={true}
                />
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, height: 400 }}>
                <AlarmTypesBarChart
                  title={alertDispatchData.barCharts.alarmLabelsByDay.title}
                  data={alertDispatchData.barCharts.alarmLabelsByDay.data}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default AlertDispatchDashboard; 