import React from 'react';
import { Box, Typography } from '@mui/material';
import { AreaChart, Area, Line, ResponsiveContainer, YAxis } from 'recharts';

/**
 * BigNumberTrendChart Component
 * Props:
 *  - value: number | string (the big number to display)
 *  - label: string (e.g. 'Alarms')
 *  - trendLabel: string (e.g. '+7.0% WoW')
 *  - trendColor: string (color for trend label, line, and area; default '#1aafe6')
 *  - trendData: array of numbers (for the sparkline)
 *  - title: string (optional, for context)
 *  - height: number (height in px for the chart container; default 160)
 */
const BigNumberTrendChart = ({ value, label, trendLabel, trendColor = '#1aafe6', trendData = [], title, height = 160 }) => {
  // Prepare data for recharts
  const chartData = trendData.map((y, i) => ({ x: i, y }));
  const yMin = Math.min(...trendData);
  const yMax = Math.max(...trendData);
  // Use a visible fill color for the area
  const areaFill = 'rgba(26, 175, 230, 0.25)';

  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: 2,
        boxShadow: 1,
        p: 3,
        minWidth: 200,
        height: height,
        display: 'flex',
        flexDirection: 'column',
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
        {label && (
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', fontWeight: 400, mt: 0.5 }}
          >
            {label}
          </Typography>
        )}
        {trendLabel && (
          <Typography
            variant="subtitle1"
            sx={{ color: trendColor, fontWeight: 400, mt: 0.5 }}
          >
            {trendLabel}
          </Typography>
        )}
      </Box>
      <Box sx={{ width: '100%', flexGrow: 1, mt: 2, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <YAxis domain={[yMin - (yMax-yMin)*0.1, yMax + (yMax-yMin)*0.1]} hide />
            <Area
              type="monotone"
              dataKey="y"
              stroke={trendColor}
              fill={areaFill}
              fillOpacity={1}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="y"
              stroke={trendColor}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default BigNumberTrendChart; 