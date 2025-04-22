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
                  description={chartData.groupedStackedCharts.severityByDay.description}
                  data={chartData.groupedStackedCharts.severityByDay.data}
                  colors={{
                    low: ['#1aafe6', '#52c7f5'],
                    medium: ['#faad14', '#ffd591'],
                    high: ['#ff6b6b', '#ffa8a8']
                  }}
                  flattenLegend={true}
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
          <SectionLabel label="Alert Dispatch Workflows" />

          {/* End-User Response Subsection */}
          <SubsectionLabel label="Alert Responses" />

          {/* Alert Responses Row */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart 
                  title="Total Alert Responses"
                  value="578"
                  label="Total Responses"
                />
              </Box>
            </Grid>
          </Grid>

          {/* End-User Response Subsection */}
          <SubsectionLabel label="Manually Dispatched Alerts" />

          {/* Manually Dispatched Alerts Big Number Row */}
          <Grid container spacing={3} sx={{ mt: 2.5 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.manuallyDispatchedAlerts.title}
                  value={chartData.bigNumbers.manuallyDispatchedAlerts.value}
                  label={chartData.bigNumbers.manuallyDispatchedAlerts.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
            <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.avgTimeManuallyDispatchedAlerts.title}
                  value={chartData.bigNumbers.avgTimeManuallyDispatchedAlerts.value}
                  label={chartData.bigNumbers.avgTimeManuallyDispatchedAlerts.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
            <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.percentManuallyDispatchedAlerts.title}
                  value={chartData.bigNumbers.percentManuallyDispatchedAlerts.value}
                  label={chartData.bigNumbers.percentManuallyDispatchedAlerts.label}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2.5 }}>
              <Box sx={{ height: 400 }}>
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

          {/* Auto Dispatched Response Subsection */}
          <SubsectionLabel label="Auto Dispatched Alerts" />

          {/* Auto Dispatched Alerts Row */}
          <Grid container spacing={3} sx={{ mt: 2.5}}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart 
                  title={chartData.bigNumbers.autoDispatchedAlerts.title}
                  value={chartData.bigNumbers.autoDispatchedAlerts.value}
                  label={chartData.bigNumbers.autoDispatchedAlerts.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
            <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.avgTimeAutoDispatchedAlerts.title}
                  value={chartData.bigNumbers.avgTimeAutoDispatchedAlerts.value}
                  label={chartData.bigNumbers.avgTimeAutoDispatchedAlerts.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
            <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.percentAutoDispatchedAlerts.title}
                  value={chartData.bigNumbers.percentAutoDispatchedAlerts.value}
                  label={chartData.bigNumbers.percentAutoDispatchedAlerts.label}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2.5 }}>
              <Box sx={{ height: 400 }}>
                <BarChart 
                  title={chartData.barCharts.autoDispatchedAlerts.title}
                  data={chartData.barCharts.autoDispatchedAlerts.data}
                  xAxisKey="date"
                  yAxisKeys={["autoDispatched"]}
                  yAxisLabels={["Auto Dispatched Alerts"]}
                  colors={["#667275"]}
                  showValueLabels={true}
                />
              </Box>
            </Grid>

          {/* Alarm  Section */}
          <SectionLabel label="Alarm Actions" />

          {/* Self Resolved Alarms Subsection */}
          <SubsectionLabel label="Self Resolved Alarms" />

          {/* Total Number of Alarms Self Resolved/Not Sustained Row */}
          <Grid container spacing={3} sx={{ mt: 2.5 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.selfResolvedAlarms.title}
                  value={chartData.bigNumbers.selfResolvedAlarms.value}
                  label={chartData.bigNumbers.selfResolvedAlarms.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.avgTimeSelfResolvedAlarms.title}
                  value={chartData.bigNumbers.avgTimeSelfResolvedAlarms.value}
                  label={chartData.bigNumbers.avgTimeSelfResolvedAlarms.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.percentageSelfResolvedAlarms.title}
                  value={chartData.bigNumbers.percentageSelfResolvedAlarms.value}
                  label={chartData.bigNumbers.percentageSelfResolvedAlarms.label}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2.5 }}>
              <Box sx={{ height: 400 }}>
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

          {/* Delayed Alarms Subsection */}
          <SubsectionLabel label="Delayed Alarms" />

          {/* Total Number of Alarms Delayed Row */}
          <Grid container spacing={3} sx={{ mt: 2.5 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.delayedAlarms.title}
                  value={chartData.bigNumbers.delayedAlarms.value}
                  label={chartData.bigNumbers.delayedAlarms.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.avgTimeDelayedAlarms.title}
                  value={chartData.bigNumbers.avgTimeDelayedAlarms.value}
                  label={chartData.bigNumbers.avgTimeDelayedAlarms.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.percentageDelayedAlarms.title}
                  value={chartData.bigNumbers.percentageDelayedAlarms.value}
                  label={chartData.bigNumbers.percentageDelayedAlarms.label}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2.5 }}>
              <Box sx={{ height: 400 }}>
                <BarChart 
                  title={chartData.barCharts.delayedAlarms.title}
                  data={chartData.barCharts.delayedAlarms.data}
                  xAxisKey="date"
                  yAxisKeys={["delayed"]}
                  yAxisLabels={["Delayed Alarms"]}
                  colors={["#667275"]}
                  showValueLabels={true}
                />
              </Box>
            </Grid>


          {/* Delayed Alarms Subsection */}
          <SubsectionLabel label="Hold Reoccurence Alarms" />

          {/* Total Number of Alarms with Hold Reoccurence Row */}
          <Grid container spacing={3} sx={{ mt: 2.5 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.holdReoccurenceAlarms.title}
                  value={chartData.bigNumbers.holdReoccurenceAlarms.value}
                  label={chartData.bigNumbers.holdReoccurenceAlarms.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.avgTimeHoldReoccurenceAlarms.title}
                  value={chartData.bigNumbers.avgTimeHoldReoccurenceAlarms.value}
                  label={chartData.bigNumbers.avgTimeHoldReoccurenceAlarms.label}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 200 }}>
                <BigNumberChart
                  title={chartData.bigNumbers.percentageHoldReoccurenceAlarms.title}
                  value={chartData.bigNumbers.percentageHoldReoccurenceAlarms.value}
                  label={chartData.bigNumbers.percentageHoldReoccurenceAlarms.label}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2.5 }}>
              <Box sx={{ height: 400 }}>
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

          {/* Alarm Queue Interval Subsection */}
          <SubsectionLabel label="Alarm Queue Interval" />

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
          <SubsectionLabel label="Alert Response" />

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
                <GroupedBarChart 
                  title={chartData.barCharts.byActions.title}
                  data={chartData.barCharts.byActions.data}
                  dataKeys={['manuallyEscalated', 'autoEscalated', 'delayedNotSustained', 'delayedManual', 'delayedAuto']}
                  labels={['Manually Escalated', 'Auto-Escalated', 'Delayed - Not Sustained', 'Delayed - Manual', 'Delayed - Auto']}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Alert Dispatch Detail Table Chart */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400, mb: 3 }}>
                <TableChart
                  title={chartData.tableCharts.alertDispatchDetail.title}
                  data={chartData.tableCharts.alertDispatchDetail.data}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Alert Response Detail Table Chart */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <TableChart
                  title={chartData.tableCharts.alertResponseDetail.title}
                  data={chartData.tableCharts.alertResponseDetail.data}
                />
              </Box>
            </Grid>
          </Grid>



        </Box>
      </Box>
      <Footer leftLabel="AirStrip Alert Management" versionId="Version 1.0" />
    </Box>
  );
}

export default AAMDashboard; 