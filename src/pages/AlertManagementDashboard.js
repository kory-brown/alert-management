import React, { useState } from 'react';
import {
  Box,
  Grid,
  Toolbar,
  Container,
  Paper,
  IconButton,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AppHeader from '../components/AppHeader';
import BigNumberChart from '../components/BigNumberChart';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import TableChart from '../components/TableChart';
import FiltersPanel from '../components/FiltersPanel';
import chartData from '../data/AAMDashboardData.json';
import { drawerWidth } from '../components/FiltersPanel';

function AlertManagementDashboard() {
  const [startDate, setStartDate] = useState('');
  const [shift, setShift] = useState('');
  const [facility, setFacility] = useState('');
  const [utility, setUtility] = useState('');
  const [severity, setSeverity] = useState('');
  const [category, setCategory] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  const handleApplyFilters = () => {
    // Handle filter application
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '1024px' }}>
      <AppHeader title="Alert Management Dashboard" />
      <Toolbar />
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
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

            {/* Rest of the dashboard content */}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AlertManagementDashboard; 