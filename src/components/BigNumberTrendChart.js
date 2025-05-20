import React from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

/**
 * BigNumberTrendChart Component
 * Props:
 *  - value: number | string (the big number to display)
 *  - trendLabel: string (e.g. '+7.0% WoW')
 *  - trendColor: string (optional, color for trend label and line)
 *  - trendData: array of numbers (for the sparkline)
 *  - title: string (optional, for context)
 */
const BigNumberTrendChart = ({ value, trendLabel, trendColor = '#5B7FFF', trendData = [], title }) => {
  // Prepare data for recharts
  const chartData = trendData.map((y, i) => ({ x: i, y }));

  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: 2,
        boxShadow: 1,
        p: 3,
        minWidth: 200,
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {title && (
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          {title}
        </Typography>
      )}
      <Box>
        <Typography variant="h2" sx={{ fontWeight: 600, lineHeight: 1 }}>
          {value}
        </Typography>
        {trendLabel && (
          <Typography
            variant="subtitle1"
            sx={{ color: trendColor, fontWeight: 400, mt: 0.5 }}
          >
            {trendLabel}
          </Typography>
        )}
      </Box>
      <Box sx={{ width: '100%', height: 48, mt: 2 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <Line
              type="monotone"
              dataKey="y"
              stroke={trendColor}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default BigNumberTrendChart; 