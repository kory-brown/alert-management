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
import chartData from '../data/TopAlarmsDashboardData.json';
import BigNumberChart from '../components/BigNumberChart';
import StackedBarChart from '../components/StackedBarChart';

function TopAlarmsDashboard() {
  const [startDate, setStartDate] = useState('');
  const [shift, setShift] = useState('');
  const [facility, setFacility] = useState('');
  const [utility, setUtility] = useState('');
  const [bed, setBed] = useState('');
  const [severity, setSeverity] = useState('');
  const [category, setCategory] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const pageTitle = "Top Alarms Dashboard";

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

           {/* Row 1 - Total Top Alarms, Alerts, and Average Time */}
           <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberChart
                value={chartData.bigNumbers.totalTopAlarms.value}
                label={chartData.bigNumbers.totalTopAlarms.label}
                title={chartData.bigNumbers.totalTopAlarms.title}
                height={300}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart
                value={chartData.bigNumbers.averageAlarmTime.value}
                label={chartData.bigNumbers.averageAlarmTime.label}
                title={chartData.bigNumbers.averageAlarmTime.title}
                height={300}
              />
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
                  yAxisKeys={["A-Fib", "Asystole", "HR High"]}
                  yAxisLabels={["A-Fib", "Asystole", "HR High"]}
                  colors={{
                    'A-Fib': '#1aafe6',
                    'Asystole': '#4CAF50',
                    'HR High': '#FFC107'
                  }}
                  isTimeFormat={false}
                />
              </Box>
            </Grid>
          </Grid>

          {/* PAGE CHART COMPONENTS */}
          <SectionLabel label="Top Alerts Summary" />

          {/* Row 3 - Total Top Alerts, and Average Time */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberChart
                value={chartData.bigNumbers.totalTopAlerts.value}
                label={chartData.bigNumbers.totalTopAlerts.label}
                title={chartData.bigNumbers.totalTopAlerts.title}
                height={300}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart
                value={chartData.bigNumbers.averageAlertTime.value}
                label={chartData.bigNumbers.averageAlertTime.label}
                title={chartData.bigNumbers.averageAlertTime.title}
                height={300}
              />
            </Grid>
          </Grid>

          {/* Row 3 - Total Alerts Responded To and Average Response Time */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <BigNumberChart
                value={chartData.bigNumbers.totalAlertsRespondedTo.value}
                label={chartData.bigNumbers.totalAlertsRespondedTo.label}
                title={chartData.bigNumbers.totalAlertsRespondedTo.title}
                height={300}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <BigNumberChart
                value={chartData.bigNumbers.averageAlarmResponseTime.value}
                label={chartData.bigNumbers.averageAlarmResponseTime.label}
                title={chartData.bigNumbers.averageAlarmResponseTime.title}
                height={300}
              />
            </Grid>
          </Grid>

          {/* Row 4 - Pie Charts */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 400 }}>
                <PieChart
                  title={chartData.pieCharts.alertDispatchActions.title}
                  data={chartData.pieCharts.alertDispatchActions.data}
                  colors={chartData.pieCharts.alertDispatchActions.colors}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 400 }}>
                <PieChart
                  title={chartData.pieCharts.alertResponseByRecipient.title}
                  data={chartData.pieCharts.alertResponseByRecipient.data}
                  colors={chartData.pieCharts.alertResponseByRecipient.colors}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: 400 }}>
                <PieChart
                  title={chartData.pieCharts.alertResponseOptions.title}
                  data={chartData.pieCharts.alertResponseOptions.data}
                  colors={chartData.pieCharts.alertResponseOptions.colors}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Row 5 - Alarm Label Detail Table */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ height: 400 }}>
                <TableChart
                  title={chartData.tableCharts.alarmLabelDetail.title}
                  data={chartData.tableCharts.alarmLabelDetail.data}
                  style={chartData.tableCharts.alarmLabelDetail.style}
                />
              </Box>
            </Grid>
          </Grid>
          
        </Box>
      </Box>
    </Box>
  );
}

export default TopAlarmsDashboard; 