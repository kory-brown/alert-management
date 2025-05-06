import React, { useState } from 'react';
import {
  Box,
  Toolbar,
  Paper,
  IconButton,
  Grid,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AppHeader from '../components/AppHeader';
import FiltersPanel from '../components/FiltersPanel';
import { drawerWidth } from '../components/FiltersPanel';
import SectionLabel from '../components/SectionLabel';
import chartData from '../data/AlertResponseDashboardData.json';
import Footer from '../components/Footer';
import BigNumberChart from '../components/BigNumberChart';
import PieChart from '../components/PieChart';
import StackedBarChart from '../components/StackedBarChart';
import GroupedBarChart from '../components/GroupedBarChart';
import BarChart from '../components/BarChart';

function AlertResponseDashboard() {
  const [startDate, setStartDate] = useState('');
  const [shift, setShift] = useState('');
  const [facility, setFacility] = useState('');
  const [utility, setUtility] = useState('');
  const [severity, setSeverity] = useState('');
  const [category, setCategory] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const pageTitle = "Alert Response Dashboard";

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
      <AppHeader title={pageTitle} />
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

          {/* PAGE CHART COMPONENTS */}
          <SectionLabel label="Alarm and Alert Volume Summary" />

          {/* ROW 1 - Big Number Charts */}   
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <BigNumberChart {...chartData.bigNumbers.totalAlarms} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart {...chartData.bigNumbers.totalDispatchedAlerts} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart {...chartData.bigNumbers.totalAlertsRespondedTo} />
            </Grid>
          </Grid>

          {/* ROW 2 - Big Number Charts */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <BigNumberChart {...chartData.bigNumbers.averageAlarmDuration} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart {...chartData.bigNumbers.averageAlertTimeUntilAccepted} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart {...chartData.bigNumbers.averageAlertTimeToResolve} />
            </Grid>
          </Grid>

          {/* ROW 3 - Charts */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <PieChart {...chartData.pieCharts.alertsByResponse} showRawValues={true} />
            </Grid>
            <Grid item xs={12} md={4}>
              <PieChart {...chartData.pieCharts.alertsByResponseOptions} showRawValues={true} />
            </Grid>
            <Grid item xs={12} md={4}>
              <PieChart {...chartData.pieCharts.alertResponseByRecipient} showRawValues={true} />
            </Grid>
          </Grid>

          {/* ROW 4 - Stacked Bar Chart */}
          <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <StackedBarChart 
                  title={chartData.stackedBarCharts.byAlarmLabels.title}
                  data={chartData.stackedBarCharts.byAlarmLabels.data}
                  groupBy={chartData.stackedBarCharts.byAlarmLabels.groupBy}
                  colors={['#1aafe6', '#667275']}
                />
              </Box>
            </Grid>

          {/* ROW 5 - Grouped Bar Chart */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <BarChart
                  title={chartData.groupedBarCharts.responsesByAlarmLabel.title}
                  data={chartData.groupedBarCharts.responsesByAlarmLabel.data}
                  xAxisKey="alarmLabel"
                  yAxisKeys={[
                    "manuallyEscalated",
                    "autoEscalated",
                    "autoFromDelay"
                  ]}
                  yAxisLabels={[
                    "Manually Escalated",
                    "Auto Escalated",
                    "Auto from Delay"
                  ]}
                  colors={[
                    "#1aafe6",
                    "#667275",
                    "#4caf50",
                    "#9c27b0"
                  ]}
                  showValueLabels={true}
                />
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default AlertResponseDashboard; 