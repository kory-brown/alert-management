import React from 'react';
import { Typography } from '@mui/material';

const SectionLabel = ({ label }) => {
  return (
    <Typography 
      variant="h5" 
      sx={{ 
        mt: 6, 
        mb: 2, 
        fontWeight: 600,
        color: '#2F2F2F'
      }}
    >
      {label}
    </Typography>
  );
};

export default SectionLabel; 