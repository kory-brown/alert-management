import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Box, Typography } from '@mui/material';

const CustomizedLabel = ({ x, y, value, stroke }) => {
  return (
    <text 
      x={x} 
      y={y - 10} 
      fill={stroke} 
      fontSize={11} 
      textAnchor="middle"
    >
      {value}
    </text>
  );
};

const LineChart = ({ title, data, severityChart, categoryChart }) => {
  return (
    <Box sx={{ width: '100%', height: '100%', p: 2, backgroundColor: '#fff' }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#2F2F2F' }}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="85%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#2F2F2F' }}
            height={40}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#2F2F2F' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #E5E5E5',
              borderRadius: '4px'
            }}
          />
          <Legend
            height={36}
            iconType="rect"
            iconSize={14}
            align="right"
            verticalAlign="top"
          />
          {categoryChart ? (
            <>
              <Line
                type="monotone"
                dataKey="arrhythmia"
                stroke="#1aafe6"
                strokeWidth={2}
                dot={{ fill: '#1aafe6', r: 4 }}
                activeDot={{ r: 6 }}
                name="Arrhythmia"
                label={<CustomizedLabel stroke="#1aafe6" />}
              />
              <Line
                type="monotone"
                dataKey="system"
                stroke="#e5801c"
                strokeWidth={2}
                dot={{ fill: '#e5801c', r: 4 }}
                activeDot={{ r: 6 }}
                name="System"
                label={<CustomizedLabel stroke="#e5801c" />}
              />
              <Line
                type="monotone"
                dataKey="other"
                stroke="#808080"
                strokeWidth={2}
                dot={{ fill: '#808080', r: 4 }}
                activeDot={{ r: 6 }}
                name="Other"
                label={<CustomizedLabel stroke="#808080" />}
              />
            </>
          ) : severityChart ? (
            <>
              <Line
                type="monotone"
                dataKey="high"
                stroke="#ff6b6b"
                strokeWidth={2}
                dot={{ fill: '#ff6b6b', r: 4 }}
                activeDot={{ r: 6 }}
                name="High"
                label={<CustomizedLabel stroke="#ff6b6b" />}
              />
              <Line
                type="monotone"
                dataKey="medium"
                stroke="#e5801c"
                strokeWidth={2}
                dot={{ fill: '#e5801c', r: 4 }}
                activeDot={{ r: 6 }}
                name="Medium"
                label={<CustomizedLabel stroke="#e5801c" />}
              />
              <Line
                type="monotone"
                dataKey="low"
                stroke="#1aafe6"
                strokeWidth={2}
                dot={{ fill: '#1aafe6', r: 4 }}
                activeDot={{ r: 6 }}
                name="Low"
                label={<CustomizedLabel stroke="#1aafe6" />}
              />
            </>
          ) : (
            <>
              <Line
                type="monotone"
                dataKey="alarms"
                stroke="#1aafe6"
                strokeWidth={2}
                dot={{ fill: '#1aafe6', r: 4 }}
                activeDot={{ r: 6 }}
                name="Alarms"
                label={<CustomizedLabel stroke="#1aafe6" />}
              />
              <Line
                type="monotone"
                dataKey="alerts"
                stroke="#808080"
                strokeWidth={2}
                dot={{ fill: '#808080', r: 4 }}
                activeDot={{ r: 6 }}
                name="Alerts"
                label={<CustomizedLabel stroke="#808080" />}
              />
            </>
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChart; 