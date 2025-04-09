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

const COLORS = [
  '#1aafe6',  // Bright Blue
  '#e5801c',  // Orange
  '#65bce8',  // Light Blue
  '#f3ad75',  // Light Orange
  '#8fc9eb',  // Softer Blue
  '#ed964c',  // Soft Orange
  '#b2d6ed',  // Very Light Blue
  '#f6c39d',  // Very Light Orange
  '#d2e3ef',  // Palest Blue
  '#f5dac7',  // Palest Orange
  '#f1f1f1'   // Gray
];

function PieChart({ title, data }) {
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
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