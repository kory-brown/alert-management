import React from 'react';
import { Box, Typography } from '@mui/material';

const SubsectionLabel = ({ label }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 6,
        mb: 3,
        gap: 2
      }}
    >
      <Typography 
        variant="subtitle2"
        sx={{ 
          fontWeight: 500,
          color: '#2F2F2F',
          whiteSpace: 'nowrap'
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          height: '1px',
          backgroundColor: '#2F2F2F',
          opacity: 0.5
        }}
      />
    </Box>
  );
};

export default SubsectionLabel; 