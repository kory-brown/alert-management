import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

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

const TrendLineChartByHour = ({ title, data }) => {
  // Format the data to show time in military format
  const formatTime = (time) => {
    const [date, hour] = time.split(' ');
    const hourNum = parseInt(hour.split(':')[0]);
    return `${hourNum.toString().padStart(2, '0')}:00`;
  };

  // Format the date
  const formatDate = (time) => {
    const [date] = time.split(' ');
    return date; // Returns YYYY-MM-DD format
  };

  // Custom tick formatter for date axis
  const formatDateTick = (time) => {
    const [date, hour] = time.split(' ');
    const hourNum = parseInt(hour.split(':')[0]);
    // Only show date for 12:00 AM entries
    return hourNum === 0 ? formatDate(time) : '';
  };

  // Format the tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <Typography variant="body2">{`Date: ${formatDate(label)}`}</Typography>
          <Typography variant="body2">{`Time: ${formatTime(label)}`}</Typography>
          <Typography variant="body2" sx={{ color: '#1aafe6' }}>{`Alarms: ${payload[0].value}`}</Typography>
          <Typography variant="body2" sx={{ color: '#808080' }}>{`Alerts: ${payload[1].value}`}</Typography>
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#2F2F2F' }}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={data}
          margin={{
            top: 30,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
          <XAxis 
            dataKey="datetime" 
            tickFormatter={formatTime}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={40}
            tick={{ fontSize: 12, fill: '#2F2F2F' }}
            y={0}
          />
          <XAxis 
            dataKey="datetime" 
            tickFormatter={formatDateTick}
            interval={0}
            height={20}
            tick={{ fontSize: 12, fill: '#2F2F2F' }}
            y={40}
            axisLine={false}
            tickLine={false}
            xAxisId="date"
          />
          <YAxis tick={{ fontSize: 12, fill: '#2F2F2F' }} />
          <Tooltip
            content={<CustomTooltip />}
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
          <Line
            type="monotone"
            dataKey="alarms"
            name="Alarms"
            stroke="#1aafe6"
            strokeWidth={2}
            dot={{ fill: '#1aafe6', r: 4 }}
            activeDot={{ r: 6 }}
            label={<CustomizedLabel stroke="#1aafe6" />}
          />
          <Line
            type="monotone"
            dataKey="alerts"
            name="Alerts"
            stroke="#808080"
            strokeWidth={2}
            dot={{ fill: '#808080', r: 4 }}
            activeDot={{ r: 6 }}
            label={<CustomizedLabel stroke="#808080" />}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TrendLineChartByHour; 