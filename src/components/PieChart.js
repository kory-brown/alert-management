import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const DEFAULT_COLORS = [
  '#1aafe6',  // Primary Blue
  '#faad14',  // Orange
  '#4caf50',  // Green
  '#ff6b6b',  // Red
  '#667275'   // Gray
];

function PieChart({ title, data, colors = {} }) {
  const getColor = (entry, index) => {
    // If a color is specified for this entry's name, use it
    if (colors[entry.name]) {
      return colors[entry.name];
    }
    // Otherwise fall back to the default color palette
    return DEFAULT_COLORS[index % DEFAULT_COLORS.length];
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: 1,
        boxShadow: 1,
        height: '100%'
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 500,
          color: '#2F2F2F'
        }}
      >
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry, index)} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => value} />
          <Legend
            verticalAlign="top"
            align="center"
            height={36}
            wrapperStyle={{
              paddingBottom: '20px'
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default PieChart; 