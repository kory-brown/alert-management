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
import BigNumberTrendChart from '../components/BigNumberTrendChart';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import TableChart from '../components/TableChart';
import SectionLabel from '../components/SectionLabel';
import chartData from '../data/QualityInitiativeDashboardData.json';

function QualityInitiativeDashboard() {
  const [startDate, setStartDate] = useState('');
  const [shift, setShift] = useState('');
  const [facility, setFacility] = useState('');
  const [utility, setUtility] = useState('');
  const [bed, setBed] = useState('');
  const [severity, setSeverity] = useState('');
  const [category, setCategory] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const pageTitle = "Quality Initiative Dashboard";

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', {
      startDate,
      shift,
      facility,
      utility,
      bed,
      severity
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
              bed={bed}
              severity={severity}
              category={category}
              onStartDateChange={setStartDate}
              onShiftChange={setShift}
              onFacilityChange={setFacility}
              onUtilityChange={setUtility}
              onBedChange={setBed}
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

          {/* ROW 1 - Big Number Trend Charts */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.totalAlarms.value}
                label={chartData.bigNumberTrends.totalAlarms.label}
                trendLabel={chartData.bigNumberTrends.totalAlarms.trendLabel}
                trendData={chartData.bigNumberTrends.totalAlarms.trendData}
                title={chartData.bigNumberTrends.totalAlarms.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.totalAlerts.value}
                label={chartData.bigNumberTrends.totalAlerts.label}
                trendLabel={chartData.bigNumberTrends.totalAlerts.trendLabel}
                trendData={chartData.bigNumberTrends.totalAlerts.trendData}
                title={chartData.bigNumberTrends.totalAlerts.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.avgAlarmTime.value}
                label={chartData.bigNumberTrends.avgAlarmTime.label}
                trendLabel={chartData.bigNumberTrends.avgAlarmTime.trendLabel}
                trendData={chartData.bigNumberTrends.avgAlarmTime.trendData}
                title={chartData.bigNumberTrends.avgAlarmTime.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
          </Grid>

          {/* Row 2 - Charts */}
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

          {/* Row 3 - Alarm Priority Charts */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 400 }}>
                <PieChart
                  title={chartData.pieCharts.alarmPriorityDistribution.title}
                  data={chartData.pieCharts.alarmPriorityDistribution.data}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 400 }}>
                <LineChart 
                  title={chartData.lineCharts.alarmPriorityDailyTrend.title}
                  data={chartData.lineCharts.alarmPriorityDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["low", "medium", "high"]}
                  yAxisLabels={["Low", "Medium", "High"]}
                  colors={{
                    'low': '#1aafe6',
                    'medium': '#FFC107',
                    'high': '#F44336'
                  }}
                  isTimeFormat={false}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 4 - Alert Priority Charts */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 400 }}>
                <PieChart
                  title={chartData.pieCharts.alertPriorityDistribution.title}
                  data={chartData.pieCharts.alertPriorityDistribution.data}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 400 }}>
                <LineChart 
                  title={chartData.lineCharts.alertPriorityDailyTrend.title}
                  data={chartData.lineCharts.alertPriorityDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["low", "medium", "high"]}
                  yAxisLabels={["Low", "Medium", "High"]}
                  colors={{
                    'low': '#1aafe6',
                    'medium': '#FFC107',
                    'high': '#F44336'
                  }}
                  isTimeFormat={false}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 5 - Alarm Priority Detail Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <TableChart
                  title={chartData.tableCharts.alarmPriorityDetail.title}
                  data={chartData.tableCharts.alarmPriorityDetail.data}
                  style={chartData.tableCharts.alarmPriorityDetail.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* PAGE CHART COMPONENTS */}
          <SectionLabel label="Alarm Labels" />

          {/* ROW 6 - Total A-Fib Alerts Big Number Trend Chart and Time Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.totalAfibAlerts.value}
                label={chartData.bigNumberTrends.totalAfibAlerts.label}
                trendLabel={chartData.bigNumberTrends.totalAfibAlerts.trendLabel}
                trendData={chartData.bigNumberTrends.totalAfibAlerts.trendData}
                title={chartData.bigNumberTrends.totalAfibAlerts.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 300 }}>
                <LineChart 
                  title={chartData.lineCharts.afibTimeDailyTrend.title}
                  data={chartData.lineCharts.afibTimeDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["avgAlarmTime", "avgAlarmQueueTime", "avgAlertResponseTime"]}
                  yAxisLabels={["Avg Alarm Time", "Avg Alarm Queue Time", "Avg Alert Response Time"]}
                  colors={{
                    'avgAlarmTime': '#1aafe6',
                    'avgAlarmQueueTime': '#4CAF50',
                    'avgAlertResponseTime': '#9C27B0'
                  }}
                  isTimeFormat={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 7 - A-Fib Details Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 150 }}>
                <TableChart
                  title={chartData.tableCharts.afibDetails.title}
                  data={chartData.tableCharts.afibDetails.data}
                  style={chartData.tableCharts.afibDetails.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 8 - Total Asystole Alerts Big Number Trend Chart and Time Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.totalAsystoleAlerts.value}
                label={chartData.bigNumberTrends.totalAsystoleAlerts.label}
                trendLabel={chartData.bigNumberTrends.totalAsystoleAlerts.trendLabel}
                trendData={chartData.bigNumberTrends.totalAsystoleAlerts.trendData}
                title={chartData.bigNumberTrends.totalAsystoleAlerts.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 300 }}>
                <LineChart 
                  title={chartData.lineCharts.asystoleTimeDailyTrend.title}
                  data={chartData.lineCharts.asystoleTimeDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["avgAlarmTime", "avgAlarmQueueTime", "avgAlertResponseTime"]}
                  yAxisLabels={["Avg Alarm Time", "Avg Alarm Queue Time", "Avg Alert Response Time"]}
                  colors={{
                    'avgAlarmTime': '#1aafe6',
                    'avgAlarmQueueTime': '#4CAF50',
                    'avgAlertResponseTime': '#9C27B0'
                  }}
                  isTimeFormat={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 9 - Asystole Details Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 150 }}>
                <TableChart
                  title={chartData.tableCharts.asystoleDetails.title}
                  data={chartData.tableCharts.asystoleDetails.data}
                  style={chartData.tableCharts.asystoleDetails.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 10 - Total HR High Alerts Big Number Trend Chart and Time Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.totalHrHighAlerts.value}
                label={chartData.bigNumberTrends.totalHrHighAlerts.label}
                trendLabel={chartData.bigNumberTrends.totalHrHighAlerts.trendLabel}
                trendData={chartData.bigNumberTrends.totalHrHighAlerts.trendData}
                title={chartData.bigNumberTrends.totalHrHighAlerts.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 300 }}>
                <LineChart 
                  title={chartData.lineCharts.hrHighTimeDailyTrend.title}
                  data={chartData.lineCharts.hrHighTimeDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["avgAlarmTime", "avgAlarmQueueTime", "avgAlertResponseTime"]}
                  yAxisLabels={["Avg Alarm Time", "Avg Alarm Queue Time", "Avg Alert Response Time"]}
                  colors={{
                    'avgAlarmTime': '#1aafe6',
                    'avgAlarmQueueTime': '#4CAF50',
                    'avgAlertResponseTime': '#9C27B0'
                  }}
                  isTimeFormat={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 11 - HR High Details Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 150 }}>
                <TableChart
                  title={chartData.tableCharts.hrHighDetails.title}
                  data={chartData.tableCharts.hrHighDetails.data}
                  style={chartData.tableCharts.hrHighDetails.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 12 - Total HR Low Alerts Big Number Trend Chart and Time Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.totalHrLowAlerts.value}
                label={chartData.bigNumberTrends.totalHrLowAlerts.label}
                trendLabel={chartData.bigNumberTrends.totalHrLowAlerts.trendLabel}
                trendData={chartData.bigNumberTrends.totalHrLowAlerts.trendData}
                title={chartData.bigNumberTrends.totalHrLowAlerts.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 300 }}>
                <LineChart 
                  title={chartData.lineCharts.hrLowTimeDailyTrend.title}
                  data={chartData.lineCharts.hrLowTimeDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["avgAlarmTime", "avgAlarmQueueTime", "avgAlertResponseTime"]}
                  yAxisLabels={["Avg Alarm Time", "Avg Alarm Queue Time", "Avg Alert Response Time"]}
                  colors={{
                    'avgAlarmTime': '#1aafe6',
                    'avgAlarmQueueTime': '#4CAF50',
                    'avgAlertResponseTime': '#9C27B0'
                  }}
                  isTimeFormat={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 13 - HR Low Details Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 150 }}>
                <TableChart
                  title={chartData.tableCharts.hrLowDetails.title}
                  data={chartData.tableCharts.hrLowDetails.data}
                  style={chartData.tableCharts.hrLowDetails.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 16 - Total Pause Alerts Big Number Trend Chart and Time Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.totalPauseAlerts.value}
                label={chartData.bigNumberTrends.totalPauseAlerts.label}
                trendLabel={chartData.bigNumberTrends.totalPauseAlerts.trendLabel}
                trendData={chartData.bigNumberTrends.totalPauseAlerts.trendData}
                title={chartData.bigNumberTrends.totalPauseAlerts.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 300 }}>
                <LineChart 
                  title={chartData.lineCharts.pauseTimeDailyTrend.title}
                  data={chartData.lineCharts.pauseTimeDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["avgAlarmTime", "avgAlarmQueueTime", "avgAlertResponseTime"]}
                  yAxisLabels={["Avg Alarm Time", "Avg Alarm Queue Time", "Avg Alert Response Time"]}
                  colors={{
                    'avgAlarmTime': '#1aafe6',
                    'avgAlarmQueueTime': '#4CAF50',
                    'avgAlertResponseTime': '#9C27B0'
                  }}
                  isTimeFormat={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 17 - Pause Details Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 150 }}>
                <TableChart
                  title={chartData.tableCharts.pauseDetails.title}
                  data={chartData.tableCharts.pauseDetails.data}
                  style={chartData.tableCharts.pauseDetails.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 18 - Total VFIB/VTACH Alerts Big Number Trend Chart and Time Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.totalVfibVtachAlerts.value}
                label={chartData.bigNumberTrends.totalVfibVtachAlerts.label}
                trendLabel={chartData.bigNumberTrends.totalVfibVtachAlerts.trendLabel}
                trendData={chartData.bigNumberTrends.totalVfibVtachAlerts.trendData}
                title={chartData.bigNumberTrends.totalVfibVtachAlerts.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 300 }}>
                <LineChart 
                  title={chartData.lineCharts.vfibVtachTimeDailyTrend.title}
                  data={chartData.lineCharts.vfibVtachTimeDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["avgAlarmTime", "avgAlarmQueueTime", "avgAlertResponseTime"]}
                  yAxisLabels={["Avg Alarm Time", "Avg Alarm Queue Time", "Avg Alert Response Time"]}
                  colors={{
                    'avgAlarmTime': '#1aafe6',
                    'avgAlarmQueueTime': '#4CAF50',
                    'avgAlertResponseTime': '#9C27B0'
                  }}
                  isTimeFormat={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 19 - VFIB/VTACH Details Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 150 }}>
                <TableChart
                  title={chartData.tableCharts.vfibVtachDetails.title}
                  data={chartData.tableCharts.vfibVtachDetails.data}
                  style={chartData.tableCharts.vfibVtachDetails.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 20 - Total SPO2 Low Alerts Big Number Trend Chart and Time Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.totalSpo2LowAlerts.value}
                label={chartData.bigNumberTrends.totalSpo2LowAlerts.label}
                trendLabel={chartData.bigNumberTrends.totalSpo2LowAlerts.trendLabel}
                trendData={chartData.bigNumberTrends.totalSpo2LowAlerts.trendData}
                title={chartData.bigNumberTrends.totalSpo2LowAlerts.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 300 }}>
                <LineChart 
                  title={chartData.lineCharts.spo2LowTimeDailyTrend.title}
                  data={chartData.lineCharts.spo2LowTimeDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["avgAlarmTime", "avgAlarmQueueTime", "avgAlertResponseTime"]}
                  yAxisLabels={["Avg Alarm Time", "Avg Alarm Queue Time", "Avg Alert Response Time"]}
                  colors={{
                    'avgAlarmTime': '#1aafe6',
                    'avgAlarmQueueTime': '#4CAF50',
                    'avgAlertResponseTime': '#9C27B0'
                  }}
                  isTimeFormat={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 21 - SPO2 Low Details Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 150 }}>
                <TableChart
                  title={chartData.tableCharts.spo2LowDetails.title}
                  data={chartData.tableCharts.spo2LowDetails.data}
                  style={chartData.tableCharts.spo2LowDetails.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* PAGE CHART COMPONENTS */}
          <SectionLabel label="Workflows" />

          {/* ROW 22 - Alert Dispatch Big Number, Line Chart, and Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.totalDispatchedAlerts.value}
                label={chartData.bigNumberTrends.totalDispatchedAlerts.label}
                trendLabel={chartData.bigNumberTrends.totalDispatchedAlerts.trendLabel}
                trendData={chartData.bigNumberTrends.totalDispatchedAlerts.trendData}
                title={chartData.bigNumberTrends.totalDispatchedAlerts.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 300 }}>
                <LineChart
                  title={chartData.lineCharts.alertDispatchTypesDailyTrend.title}
                  data={chartData.lineCharts.alertDispatchTypesDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["manuallyDispatched", "autoDispatched", "selfResolved"]}
                  yAxisLabels={["Manually Dispatched", "Auto Dispatched", "Self Resolved"]}
                  colors={{
                    'manuallyDispatched': '#1aafe6',
                    'autoDispatched': '#4CAF50',
                    'selfResolved': '#9C27B0'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 300 }}>
                <TableChart
                  title={chartData.tableCharts.alertDispatchDetail.title}
                  data={chartData.tableCharts.alertDispatchDetail.data}
                  style={chartData.tableCharts.alertDispatchDetail.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 23 - Alert Response Big Number, Line Chart, and Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.totalAlertsRespondedTo.value}
                label={chartData.bigNumberTrends.totalAlertsRespondedTo.label}
                trendLabel={chartData.bigNumberTrends.totalAlertsRespondedTo.trendLabel}
                trendData={chartData.bigNumberTrends.totalAlertsRespondedTo.trendData}
                title={chartData.bigNumberTrends.totalAlertsRespondedTo.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 300 }}>
                <LineChart
                  title={chartData.lineCharts.alertResponseTypesDailyTrend.title}
                  data={chartData.lineCharts.alertResponseTypesDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["manuallyEscalated", "autoEscalated", "accepted", "selfResolved"]}
                  yAxisLabels={["Manually Escalated", "Auto Escalated", "Accepted", "Self Resolved"]}
                  colors={{
                    'manuallyEscalated': '#1aafe6',
                    'autoEscalated': '#4CAF50',
                    'accepted': '#FFC107',
                    'selfResolved': '#9C27B0'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 300 }}>
                <TableChart
                  title={chartData.tableCharts.alertResponseDetail.title}
                  data={chartData.tableCharts.alertResponseDetail.data}
                  style={chartData.tableCharts.alertResponseDetail.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* ROW 24 - Alert Response by Recipient Big Number, Line Chart, and Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberTrendChart
                value={chartData.bigNumberTrends.totalAlertsRespondedToByRecipient.value}
                label={chartData.bigNumberTrends.totalAlertsRespondedToByRecipient.label}
                trendLabel={chartData.bigNumberTrends.totalAlertsRespondedToByRecipient.trendLabel}
                trendData={chartData.bigNumberTrends.totalAlertsRespondedToByRecipient.trendData}
                title={chartData.bigNumberTrends.totalAlertsRespondedToByRecipient.title}
                height={300}
                trendColor={'#1aafe6'}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 300 }}>
                <LineChart
                  title={chartData.lineCharts.alertResponseByRecipientTrend.title}
                  data={chartData.lineCharts.alertResponseByRecipientTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["R1", "R2", "R3", "R4"]}
                  yAxisLabels={["R1", "R2", "R3", "R4"]}
                  colors={{
                    'R1': '#1aafe6',
                    'R2': '#4CAF50',
                    'R3': '#FFC107',
                    'R4': '#9C27B0'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 300 }}>
                <TableChart
                  title={chartData.tableCharts.alertResponseByRecipientDetail.title}
                  data={chartData.tableCharts.alertResponseByRecipientDetail.data}
                  style={chartData.tableCharts.alertResponseByRecipientDetail.style}
                />
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Box>
  );
}

export default QualityInitiativeDashboard; 