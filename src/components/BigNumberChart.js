import React from 'react';
import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const BigNumberChart = ({ title, value, label }) => (
  <Paper 
    sx={{ 
      p: 3, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      bgcolor: 'white',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
    }}
  >
    <Typography 
      variant="subtitle2" 
      sx={{ 
        color: 'text.secondary',
        fontWeight: 500,
        mb: 1
      }}
    >
      {title}
    </Typography>
    <Typography 
      variant="h3" 
      sx={{ 
        fontWeight: 600,
        mb: 1,
        color: '#2F2F2F'
      }}
    >
      {value.toLocaleString()}
    </Typography>
    <Typography 
      variant="body2" 
      sx={{ 
        color: 'text.secondary',
        fontWeight: 400
      }}
    >
      {label}
    </Typography>
  </Paper>
);

BigNumberChart.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired
};

export default BigNumberChart; 