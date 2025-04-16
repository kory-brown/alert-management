import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Typography, 
  Grid, 
  Card, 
  CardActionArea,
  Box,
  Container,
  Toolbar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TimelineIcon from '@mui/icons-material/Timeline';
import GroupIcon from '@mui/icons-material/Group';
import BedIcon from '@mui/icons-material/Bed';
import PersonIcon from '@mui/icons-material/Person';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AppHeader from '../components/AppHeader';

function Home() {
  const dashboards = [
    {
      id: 'aam',
      name: 'AAM Dashboard',
      description: 'Alert and Analytics Management Dashboard',
      path: '/dashboard/aam',
      icon: <DashboardIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'alert-dispatch',
      name: 'Alert Dispatch',
      description: 'Monitor and manage alert dispatch operations',
      path: '/dashboard/alert-dispatch',
      icon: <NotificationsActiveIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'alert-response',
      name: 'Alert Response',
      description: 'Track and analyze alert response metrics',
      path: '/dashboard/alert-response',
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'top-alarms',
      name: 'Top Alarms & Alerts',
      description: 'View most frequent and critical alarms',
      path: '/dashboard/top-alarms',
      icon: <TimelineIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'quality-initiative',
      name: 'Quality Initiative Assessment',
      description: 'Evaluate quality improvement metrics',
      path: '/dashboard/quality',
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'shift',
      name: 'Shift',
      description: 'Shift-based analytics and metrics',
      path: '/dashboard/shift',
      icon: <AccessTimeIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'individual-bed',
      name: 'Individual Bed',
      description: 'Per-bed monitoring and analysis',
      path: '/dashboard/bed',
      icon: <BedIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'end-user-metrics',
      name: 'End-User Metrics',
      description: 'User performance and interaction analytics',
      path: '/dashboard/user-metrics',
      icon: <PersonIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'alert-escalation',
      name: 'Alert Escalation',
      description: 'Track alert escalation patterns',
      path: '/dashboard/escalation',
      icon: <CallSplitIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'pathways',
      name: 'Pathways',
      description: 'Alert and response pathway analysis',
      path: '/dashboard/pathways',
      icon: <AccountTreeIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'audit-trail',
      name: 'Audit Trail',
      description: 'System and user action audit logs',
      path: '/dashboard/audit',
      icon: <HistoryIcon sx={{ fontSize: 40 }} />
    },
    {
      id: '24hr-trend',
      name: '24-HR Unit Trend',
      description: 'Daily unit performance trends',
      path: '/dashboard/unit-trend',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />
    },
    {
      id: 'alarm-alert-escalation',
      name: 'Alarm & Alert Escalation',
      description: 'Comprehensive escalation analytics',
      path: '/dashboard/alarm-escalation',
      icon: <NotificationsIcon sx={{ fontSize: 40 }} />
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '1024px' }}>
      <AppHeader title="Alert Management Reporting" />
      <Toolbar />
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        <Grid container spacing={3}>
          {dashboards.map((dashboard) => (
            <Grid item xs={12} sm={6} md={4} key={dashboard.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  },
                  backgroundColor: '#fff'
                }}
              >
                <CardActionArea 
                  component={Link} 
                  to={dashboard.path}
                  sx={{ 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3
                  }}
                >
                  <Box sx={{ color: '#1aafe6', mb: 2 }}>
                    {dashboard.icon}
                  </Box>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {dashboard.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {dashboard.description}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;