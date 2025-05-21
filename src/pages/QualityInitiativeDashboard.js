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

        </Box>
      </Box>
    </Box>
  );
}

export default QualityInitiativeDashboard; 