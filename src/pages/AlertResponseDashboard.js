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
import TableChart from '../components/TableChart';
import LineChart from '../components/LineChart';

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

          {/* ROW 2: Alarms and Alerts Daily TrendRow */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart 
                  title={chartData.lineCharts.alarmsAndAlertsDailyTrend.title}
                  data={chartData.lineCharts.alarmsAndAlertsDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["alarms", "alerts"]}
                  yAxisLabels={["Alarms", "Alerts"]}
                  colors={{
                    'alarms': '#1aafe6',
                    'alerts': '#808080'
                  }}
                  isTimeFormat={false}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 3 - Big Number Charts */}
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


          {/* ROW 5 - Charts */}
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

            {/* ROW 4 - Alerts by Alarm Label Daily Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart 
                  title={chartData.lineCharts.alertsByAlarmLabelDailyTrend.title}
                  data={chartData.lineCharts.alertsByAlarmLabelDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={[
                    "AFIB",
                    "ASYSTOLE",
                    "HR HIGH",
                    "HR LOW",
                    "PAUSE",
                    "VFIB/VTACH",
                    "SPO2 LOW"
                  ]}
                  yAxisLabels={[
                    "AFIB",
                    "ASYSTOLE",
                    "HR HIGH",
                    "HR LOW",
                    "PAUSE",
                    "VFIB/VTACH",
                    "SPO2 LOW"
                  ]}
                  colors={{
                    'AFIB': '#1aafe6',
                    'ASYSTOLE': '#667275',
                    'HR HIGH': '#4caf50',
                    'HR LOW': '#ff9800',
                    'PAUSE': '#9c27b0',
                    'VFIB/VTACH': '#f44336',
                    'SPO2 LOW': '#795548'
                  }}
                  isTimeFormat={false}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 5 - Big Number Charts */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={3}>
              <BigNumberChart {...chartData.bigNumbers.totalAcceptedAlerts} />
            </Grid>
            <Grid item xs={12} md={3}>
              <BigNumberChart {...chartData.bigNumbers.totalManuallyEscalatedAlerts} />
            </Grid>
            <Grid item xs={12} md={3}>
              <BigNumberChart {...chartData.bigNumbers.totalAutoEscalatedAlerts} />
            </Grid>
            <Grid item xs={12} md={3}>
              <BigNumberChart {...chartData.bigNumbers.totalSelfResolvedAlerts} />
            </Grid>
          </Grid>

          {/* ROW 6 - Grouped Bar Chart and Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 400 }}>
                <TableChart
                  title={chartData.tableCharts.alarmLabelAvgDuration.title}
                  data={chartData.tableCharts.alarmLabelAvgDuration.data}
                  style={chartData.tableCharts.alarmLabelAvgDuration.style}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 400 }}>
                <BarChart
                  title={chartData.groupedBarCharts.responsesByAlarmLabel.title}
                  data={chartData.groupedBarCharts.responsesByAlarmLabel.data}
                  xAxisKey="alarmLabel"
                  yAxisKeys={[
                    "manuallyEscalated",
                    "autoEscalated",
                    "accepted",
                    "selfResolved"
                  ]}
                  yAxisLabels={[
                    "Manually Escalated",
                    "Auto Escalated",
                    "Accepted",
                    "Self Resolved"
                  ]}
                  colors={[
                    "#1aafe6",
                    "#667275",
                    "#4caf50",
                    "#ff9800"
                  ]}
                  showValueLabels={true}
                />
              </Box>
            </Grid>
          </Grid>


          {/* ROW 6 - Alarm Label Response Detail Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <TableChart
                  title={chartData.tableCharts.alarmLabelResponseDetail.title}
                  data={chartData.tableCharts.alarmLabelResponseDetail.data}
                  style={chartData.tableCharts.alarmLabelResponseDetail.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 7 - Alarm Label Recipient Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <TableChart
                  title={chartData.tableCharts.alarmLabelRecipientTable.title}
                  data={chartData.tableCharts.alarmLabelRecipientTable.data}
                  style={chartData.tableCharts.alarmLabelRecipientTable.style}
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