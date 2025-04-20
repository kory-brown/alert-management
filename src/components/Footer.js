import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = ({ leftLabel = "Alarm Alert Management", versionId = "Version 1.0" }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        marginTop: 'auto',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {leftLabel}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {versionId}
      </Typography>
    </Box>
  );
};

export default Footer; 