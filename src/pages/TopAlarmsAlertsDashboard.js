import React, { useState } from 'react';
import {
  Box,
  Toolbar,
  Paper,
  IconButton,
  Grid,
  Typography,
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
import chartData from '../data/TopAlarmsAlertsDashboardData.json';
import BigNumberChart from '../components/BigNumberChart';
import StackedBarChart from '../components/StackedBarChart';
import Footer from '../components/Footer';
import BarChart from '../components/BarChart';

function TopAlarmsAlertsDashboard() {
  const [startDate, setStartDate] = useState('');
  const [shift, setShift] = useState('');
  const [facility, setFacility] = useState('');
  const [utility, setUtility] = useState('');
  const [bed, setBed] = useState('');
  const [severity, setSeverity] = useState('');
  const [category, setCategory] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const pageTitle = "Top Alarms & Alerts Dashboard";

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

          {/* PAGE CHART COMPONENTS */}
          <SectionLabel label="Top Alarms Summary" />

          {/* Row 1 - Top Alarms Detail Table and Bar Chart */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 300 }}>
                <TableChart
                  title={chartData.tableCharts.alarmLabelDetail.title}
                  data={chartData.tableCharts.alarmLabelDetail.data}
                  style={chartData.tableCharts.alarmLabelDetail.style}
                  columnLabels={chartData.tableCharts.alarmLabelDetail.columnLabels}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 300 }}>
                <BarChart
                  title={chartData.barCharts.topAlarmTotals.title}
                  data={chartData.barCharts.topAlarmTotals.data}
                  xAxisKey="alarmLabel"
                  yAxisKeys={["alarms"]}
                  yAxisLabels={["Alarms"]}
                  showValueLabels={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 2 - Top Alarms Daily Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart
                  title={chartData.lineCharts.topAlarmsDailyTrend.title}
                  data={chartData.lineCharts.topAlarmsDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["A-Fib", "HR High", "VFIB/VTACH"]}
                  yAxisLabels={["A-Fib", "HR High", "VFIB/VTACH"]}
                  colors={{
                    'A-Fib': '#1aafe6',
                    'HR High': '#FFC107',
                    'VFIB/VTACH': '#4CAF50'
                  }}
                  isTimeFormat={false}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 3 - Top Alarms Avg Duration Daily Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart
                  title={chartData.lineCharts.topAlarmsAvgDurationDailyTrend.title}
                  data={chartData.lineCharts.topAlarmsAvgDurationDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["A-Fib", "HR High", "VFIB/VTACH"]}
                  yAxisLabels={["A-Fib", "HR High", "VFIB/VTACH"]}
                  colors={{
                    'A-Fib': '#1aafe6',
                    'HR High': '#FFC107',
                    'VFIB/VTACH': '#4CAF50'
                  }}
                  isTimeFormat={true}
                />
              </Box>
            </Grid>
          </Grid>

           {/* Row 4 - Top Alarms Alert Response Daily Trend */}
           <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart
                  title={chartData.lineCharts.topAlarmsAlertResponseDailyTrend.title}
                  data={chartData.lineCharts.topAlarmsAlertResponseDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["Manually Escalated", "Auto Escalated", "Accepted", "Self Resolved"]}
                  yAxisLabels={["Manually Escalated", "Auto Escalated", "Accepted", "Self Resolved"]}
                  colors={{
                    'Manually Escalated': '#FF6B6B',
                    'Auto Escalated': '#4ECDC4',
                    'Accepted': '#45B7D1',
                    'Self Resolved': '#96CEB4'
                  }}
                  isTimeFormat={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 5 - Top Alarm Dispatch Detail Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 300 }}>
                <TableChart
                  title={chartData.tableCharts.topAlarmDispatchDetail.title}
                  data={chartData.tableCharts.topAlarmDispatchDetail.data}
                  style={chartData.tableCharts.topAlarmDispatchDetail.style}
                  columnLabels={chartData.tableCharts.topAlarmDispatchDetail.columnLabels}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 6 - Top Alarm Alert Response Detail Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 300 }}>
                <TableChart
                  title={chartData.tableCharts.topAlarmAlertResponseDetail.title}
                  data={chartData.tableCharts.topAlarmAlertResponseDetail.data}
                  style={chartData.tableCharts.topAlarmAlertResponseDetail.style}
                  columnLabels={chartData.tableCharts.topAlarmAlertResponseDetail.columnLabels}
                />
              </Box>
            </Grid>
          </Grid> 

          {/* Row 7 - Top Alarm Alert Response by Recipient Detail Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 300 }}>
                <TableChart
                  title={chartData.tableCharts.topAlarmAlertResponseByRecipientDetail.title}
                  data={chartData.tableCharts.topAlarmAlertResponseByRecipientDetail.data}
                  columns={chartData.tableCharts.topAlarmAlertResponseByRecipientDetail.columns}
                  style={chartData.tableCharts.topAlarmAlertResponseByRecipientDetail.style}
                />
              </Box>
            </Grid>
          </Grid>

          {/* PAGE CHART COMPONENTS */}
          <SectionLabel label="Top Alerts Summary" />
          
          {/* Row 8 - Top Alerts Detail Table and Bar Chart */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 300 }}>
                <TableChart
                  title={chartData.tableCharts.topAlertsDetail.title}
                  data={chartData.tableCharts.topAlertsDetail.data}
                  style={chartData.tableCharts.topAlertsDetail.style}
                  columnLabels={chartData.tableCharts.topAlertsDetail.columnLabels}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 300 }}>
                <BarChart
                  title={chartData.barCharts.topAlertTotals.title}
                  data={chartData.barCharts.topAlertTotals.data}
                  xAxisKey={chartData.barCharts.topAlertTotals.xAxisKey}
                  yAxisKeys={[chartData.barCharts.topAlertTotals.yAxisKey]}
                  yAxisLabels={["Alerts"]}
                  showValueLabels={chartData.barCharts.topAlertTotals.showValues}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 9 - Top Alerts Daily Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart 
                  title={chartData.lineCharts.topAlertsDailyTrend.title}
                  data={chartData.lineCharts.topAlertsDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["A-Fib", "HR High", "VFIB/VTACH"]}
                  yAxisLabels={["A-Fib", "HR High", "VFIB/VTACH"]}
                  colors={{
                    'A-Fib': '#1aafe6',
                    'HR High': '#FFC107',
                    'VFIB/VTACH': '#4CAF50'
                  }}
                  isTimeFormat={false}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 10 - Top Alerts Average Duration Daily Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart 
                  title={chartData.lineCharts.topAlertsAvgDurationDailyTrend.title}
                  data={chartData.lineCharts.topAlertsAvgDurationDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["A-Fib", "HR High", "VFIB/VTACH"]}
                  yAxisLabels={["A-Fib", "HR High", "VFIB/VTACH"]}
                  colors={{
                    'A-Fib': '#1aafe6',
                    'HR High': '#FFC107',
                    'VFIB/VTACH': '#4CAF50'
                  }}
                  isTimeFormat={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 11 - Top Alerts Alert Response Daily Trend */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <LineChart
                  title={chartData.lineCharts.topAlertsAlertResponseDailyTrend.title}
                  data={chartData.lineCharts.topAlertsAlertResponseDailyTrend.data}
                  xAxisKey="date"
                  yAxisKeys={["Manually Escalated", "Auto Escalated", "Accepted", "Self Resolved"]}
                  yAxisLabels={["Manually Escalated", "Auto Escalated", "Accepted", "Self Resolved"]}
                  colors={{
                    'Manually Escalated': '#FF6B6B',
                    'Auto Escalated': '#4ECDC4',
                    'Accepted': '#45B7D1',
                    'Self Resolved': '#96CEB4'
                  }}
                  isTimeFormat={true}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 12 - Alert Dispatch Detail Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 300 }}>
                <TableChart
                  title={chartData.tableCharts.alertDispatchDetail.title}
                  data={chartData.tableCharts.alertDispatchDetail.data}
                  style={chartData.tableCharts.alertDispatchDetail.style}
                  columnLabels={chartData.tableCharts.alertDispatchDetail.columnLabels}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 13 - Top Alerts Alert Response Detail Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 300 }}>
                <TableChart
                  title={chartData.tableCharts.topAlertsAlertResponseDetail.title}
                  data={chartData.tableCharts.topAlertsAlertResponseDetail.data}
                  style={chartData.tableCharts.topAlertsAlertResponseDetail.style}
                  columnLabels={chartData.tableCharts.topAlertsAlertResponseDetail.columnLabels}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 14 - Top Alerts Alert Response by Recipient Detail Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 300 }}>
                <TableChart
                  title={chartData.tableCharts.topAlertsAlertResponseByRecipientDetail.title}
                  data={chartData.tableCharts.topAlertsAlertResponseByRecipientDetail.data}
                  columns={chartData.tableCharts.topAlertsAlertResponseByRecipientDetail.columns}
                  style={chartData.tableCharts.topAlertsAlertResponseByRecipientDetail.style}
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

export default TopAlarmsAlertsDashboard; 