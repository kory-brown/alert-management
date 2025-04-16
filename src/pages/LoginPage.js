import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from '../assets/logo.svg';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(loginData.username, loginData.password)) {
      navigate('/home');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', minWidth: '1024px' }}>
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={1}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          minWidth: '1024px'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DashboardIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div">
              Alert Management Reporting
            </Typography>
          </Box>
          <img 
            src={logo} 
            alt="Logo" 
            style={{ 
              height: '40px',
              marginLeft: 'auto'
            }} 
          />
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Container maxWidth="sm" sx={{ py: 4, flex: 1 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            backgroundColor: '#fff'
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={loginData.username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={loginData.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage; 