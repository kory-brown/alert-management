import React, { useState } from 'react';
import {
  Box,
  Grid,
  Toolbar,
  Paper,
  IconButton,
  Typography
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AppHeader from '../components/AppHeader';
import BigNumberChart from '../components/BigNumberChart';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import TableChart from '../components/TableChart';
import FiltersPanel from '../components/FiltersPanel';
import chartData from '../data/AlertDispatchDashboardData.json';
import { drawerWidth } from '../components/FiltersPanel';

function AlertDispatchDashboard() {
  const [startDate, setStartDate] = useState('');
  const [shift, setShift] = useState('');
  const [facility, setFacility] = useState('');
  const [utility, setUtility] = useState('');
  const [severity, setSeverity] = useState('');
  const [category, setCategory] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

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

  const pageTitle = "Alert Dispatch Dashboard";
  
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

          {/* Add more sections specific to Alert Dispatch Dashboard here */}
        </Box>
      </Box>
    </Box>
  );
}

export default AlertDispatchDashboard; 