import React, { useState } from 'react';
/*import { Link } from 'react-router-dom';*/
import {
  Typography,
  Grid,
  Paper,
  Box,
  IconButton,
  Toolbar
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import BigNumberChart from '../components/BigNumberChart';
import BarChart from '../components/BarChart';
import GroupedBarChart from '../components/GroupedBarChart';
import PieChart from '../components/PieChart';
import TableChart from '../components/TableChart';
import LineChart from '../components/LineChart';
import FiltersPanel from '../components/FiltersPanel';
import SubsectionLabel from '../components/SubsectionLabel';
import SectionLabel from '../components/SectionLabel';
import chartData from '../data/AAMDashboardData.json';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import { drawerWidth } from '../components/FiltersPanel';
import StackedBarChart from '../components/StackedBarChart';
import GroupedStackedBarChart from '../components/GroupedStackedBarChart';

function AAMDashboard() {
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

          <SectionLabel label="Alarm and Alert Volume Summary" />

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

          {/* Alarms and Alerts Daily TrendRow */}
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

          {/* Alarm and Alerts by LabelsBar Chart */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 400 }}>
                <TableChart
                  title={chartData.tableCharts.alarmLabelStats.title}
                  data={chartData.tableCharts.alarmLabelStats.data}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 400 }}>
                <StackedBarChart 
                  title={chartData.stackedBarCharts.byAlarmLabels.title}
                  data={chartData.stackedBarCharts.byAlarmLabels.data}
                  groupBy={chartData.stackedBarCharts.byAlarmLabels.groupBy}
                  colors={['#1aafe6', '#667275']}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Priority Charts */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 400 }}>
                <StackedBarChart
                  title={chartData.stackedBarCharts.bySeverity.title}
                  data={chartData.stackedBarCharts.bySeverity.data}
                  groupBy={chartData.stackedBarCharts.bySeverity.groupBy}
                  colors={['#1aafe6', '#667275']}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 400 }}>
                <PieChart
                  title={chartData.pieCharts.alarmsByPriority.title}
                  data={chartData.pieCharts.alarmsByPriority.data}
                  colors={{
                    'Low': '#1aafe6',
                    'Medium': '#faad14',
                    'High': '#ff6b6b'
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 400 }}>
                <PieChart
                  title={chartData.pieCharts.alertsByPriority.title}
                  data={chartData.pieCharts.alertsByPriority.data}
                  colors={{
                    'Low': '#1aafe6',
                    'Medium': '#faad14',
                    'High': '#ff6b6b'
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Severity Trends by Day */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <GroupedStackedBarChart
                  title={chartData.groupedStackedCharts.severityByDay.title}
                  data={chartData.groupedStackedCharts.severityByDay.data}
                  flattenLegend={true}
                  xAxisKey="date"
                  colors={{
                    low: ['#52c7f5', '#1aafe6'],      // Lighter blue for alarms, darker blue for alerts
                    medium: ['#ffd591', '#faad14'],    // Lighter orange for alarms, darker orange for alerts
                    high: ['#ffa8a8', '#ff6b6b']       // Lighter red for alarms, darker red for alerts
                  }}
                  keys={{
                    low: ['lowAlarms', 'lowAlerts'],
                    medium: ['mediumAlarms', 'mediumAlerts'],
                    high: ['highAlarms', 'highAlerts']
                  }}
                  labels={{
                    low: 'Low',
                    medium: 'Medium',
                    high: 'High'
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Alarm Duration by Priority Daily Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart 
                  title={chartData.lineCharts.alarmDurationByPriorityTrend.title}
                  data={chartData.lineCharts.alarmDurationByPriorityTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["low", "medium", "high"]}
                  yAxisLabels={["Low", "Medium", "High"]}
                  colors={{
                    'low': '#1aafe6',
                    'medium': '#faad14',
                    'high': '#ff6b6b'
                  }}
                  isTimeFormat={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Alert Dispatch Workflows Section */}
          <SectionLabel label="Alert Dispatch Metrics" />

          {/* Alert Responses Row */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={3}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart 
                  title={chartData.bigNumbers.totalAlarmsDispatched.title}
                  value={chartData.bigNumbers.totalAlarmsDispatched.value}
                  label={chartData.bigNumbers.totalAlarmsDispatched.label}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.manuallyDispatchedAlerts.title}
                  value={chartData.bigNumbers.manuallyDispatchedAlerts.value}
                  label={chartData.bigNumbers.manuallyDispatchedAlerts.label}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart 
                  title={chartData.bigNumbers.autoDispatchedAlerts.title}
                  value={chartData.bigNumbers.autoDispatchedAlerts.value}
                  label={chartData.bigNumbers.autoDispatchedAlerts.label}
                />
              </Box>
            </Grid>

            {/* NEED TO GIVE THIS ITS OWN DATA SET with TIME FORMAT*/ }
            <Grid item xs={12} md={3}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart 
                  title={chartData.bigNumbers.avgDispatchAlarmDuration.title}
                  value={chartData.bigNumbers.avgDispatchAlarmDuration.value}
                  label={chartData.bigNumbers.avgDispatchAlarmDuration.label}
                />
              </Box>
            </Grid>
            
          </Grid>

          <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={12}>
              <Box sx={{ height: 400 }}>
                <TableChart
                  title={chartData.tableCharts.alarmLabelDetail.title}
                  data={chartData.tableCharts.alarmLabelDetail.data}
                />
              </Box>
            </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
            <PieChart
                  title={chartData.pieCharts.alertDispatchTypes.title}
                  data={chartData.pieCharts.alertDispatchTypes.data}
                  colors={{
                    'Manually Dispatched': '#1aafe6',
                    'Auto Dispatched': '#faad14',
                    'Not Sustained': '#ff6b6b'
                  }}
                />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 400 }}>
                <GroupedBarChart 
                  title={chartData.barCharts.alarmLabelDispatchTypes.title}
                  data={chartData.barCharts.alarmLabelDispatchTypes.data}
                  xAxisKey="alarmLabel"
                  dataKeys={['manuallyDispatched', 'autoDispatched', 'selfResolved']}
                  labels={['Manually Dispatched', 'Auto Dispatched', 'Self Resolved']}
                  colors={['#1aafe6', '#667275', '#ff9c6e']}
                />
              </Box>
            </Grid>
            </Grid>

            {/* Dispatch Types Daily Trend */}
            <Grid container spacing={3} sx={{ mt: 2.5 }}>
              <Grid item xs={12} md={4}>
                <Box sx={{ height: 400 }}>
                  <TableChart
                    title={chartData.tableCharts.alarmLabelVolumeDetail.title}
                    data={chartData.tableCharts.alarmLabelVolumeDetail.data}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{ height: 400 }}>
                  <LineChart 
                    title={chartData.lineCharts.dispatchTypesDailyTrend.title}
                    data={chartData.lineCharts.dispatchTypesDailyTrend.data}
                    xAxisKey="date"
                    yAxisKeys={["manuallyEscalated", "autoEscalated", "selfResolved"]}
                    yAxisLabels={["Manually Escalated", "Auto Escalated", "Self Resolved"]}
                    colors={{
                      'manuallyEscalated': '#667275',
                      'autoEscalated': '#1aafe6',
                      'selfResolved': '#ff9c6e'
                    }}
                    isTimeFormat={false}
                  />
                </Box>
              </Grid>
            </Grid>

          {/* End-User Response Subsection */}
          <SectionLabel label="Alert Response Metrics" />

            {/* Total Alerts Bottom */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.totalAlertsBottom.title}
                  value={chartData.bigNumbers.totalAlertsBottom.value}
                  label={chartData.bigNumbers.totalAlertsBottom.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.totalAlertsRespondedTo.title}
                  value={chartData.bigNumbers.totalAlertsRespondedTo.value}
                  label={chartData.bigNumbers.totalAlertsRespondedTo.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.avgResponseTime.title}
                  value={chartData.bigNumbers.avgResponseTime.value}
                  label={chartData.bigNumbers.avgResponseTime.label}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Pie Charts Row */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={4}>
              <Box sx={{ height: 400 }}>
                <TableChart
                  title={chartData.tableCharts.alertResponseByLabel.title}
                  data={chartData.tableCharts.alertResponseByLabel.data}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <PieChart
                title="Percentage of Alert Response"
                data={[
                  { name: 'Response 1', value: 30 },
                  { name: 'Response 2', value: 25 },
                  { name: 'Response 3', value: 20 },
                  { name: 'No Response', value: 25 }
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

          {/* Alert Response Detail Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <TableChart
                  title={chartData.tableCharts.alertResponseDetail.title}
                  data={chartData.tableCharts.alertResponseDetail.data}
                  style={chartData.tableCharts.alertResponseDetail.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Alert Response by Recipient Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <TableChart
                  title={chartData.tableCharts.alertResponseByRecipient.title}
                  description={chartData.tableCharts.alertResponseByRecipient.description}
                  data={chartData.tableCharts.alertResponseByRecipient.data}
                  style={chartData.tableCharts.alertResponseByRecipient.style}
                />
              </Box>
            </Grid>
          </Grid>



            {/* Response Types by Alarm Label Chart */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item xs={12}>
                <Box sx={{ height: 400 }}>
                  <GroupedBarChart 
                    title={chartData.barCharts.responseTypesByLabel.title}
                    data={chartData.barCharts.responseTypesByLabel.data}
                    xAxisKey="alarmLabel"
                    dataKeys={['accept', 'escalate', 'noResponse']}
                    labels={['Accept', 'Escalate', 'No Response']}
                    colors={['#1aafe6', '#faad14', '#ff6b6b']}
                  />
                </Box>
              </Grid>
            </Grid>


            {/* Alerts Responded To Daily Trend */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart 
                  title={chartData.lineCharts.alertsRespondedTrend.title}
                  data={chartData.lineCharts.alertsRespondedTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["totalAlerts", "alertsResponded"]}
                  yAxisLabels={["Total Alerts", "Alerts Responded"]}
                  colors={{
                    'totalAlerts': '#1aafe6',
                    'alertsResponded': '#52c41a'
                  }}
                  isTimeFormat={false}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Alert Response Types Daily Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart 
                  title={chartData.lineCharts.responseTypesDailyTrend.title}
                  data={chartData.lineCharts.responseTypesDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["accepts", "escalate", "noResponse"]}
                  yAxisLabels={["Accept", "Escalate", "No Response"]}
                  colors={{
                    'accepts': '#1aafe6',
                    'escalate': '#faad14',
                    'noResponse': '#ff6b6b'
                  }}
                  isTimeFormat={false}
                />
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Footer leftLabel="AirStrip Alert Management" versionId="Version 1.0" />
      </Box>
    </Box>
  );
}

export default AAMDashboard; 