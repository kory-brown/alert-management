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

const CustomizedLabel = ({ x, y, value, stroke, isTimeFormat }) => {
  const formatValue = (val) => {
    if (!isTimeFormat) return val.toLocaleString();
    if (typeof val === 'string' && val.includes(':')) {
      return val;
    }
    const minutes = Math.floor(val / 60);
    const seconds = val % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <text 
      x={x} 
      y={y - 10} 
      fill={stroke} 
      fontSize={11} 
      textAnchor="middle"
    >
      {formatValue(value)}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label, isTimeFormat }) => {
  if (active && payload && payload.length) {
    const formatValue = (val) => {
      if (!isTimeFormat) return val.toLocaleString();
      if (typeof val === 'string' && val.includes(':')) {
        return val;
      }
      const minutes = Math.floor(val / 60);
      const seconds = val % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
      <Box sx={{ 
        backgroundColor: 'white', 
        p: 1, 
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}>
        <Typography variant="body2">{`Date: ${label}`}</Typography>
        {payload.map((entry) => (
          <Typography 
            key={entry.name}
            variant="body2"
            style={{ color: entry.color }}
          >
            {`${entry.name}: ${formatValue(entry.value)}`}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

const LineChart = ({ 
  title, 
  data, 
  xAxisKey = 'date', 
  yAxisKeys = [], 
  yAxisLabels = [], 
  colors = {}, 
  isTimeFormat = false 
}) => {
  // Convert time strings to seconds for plotting only if isTimeFormat is true
  const processedData = isTimeFormat ? data.map(item => {
    const newItem = { ...item };
    yAxisKeys.forEach(key => {
      if (typeof item[key] === 'string' && item[key].includes(':')) {
        const [minutes, seconds] = item[key].split(':').map(Number);
        newItem[key] = minutes * 60 + seconds;
      }
    });
    return newItem;
  }) : data;

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%',
      p: 2,
      backgroundColor: 'white',
      borderRadius: 1,
      boxShadow: 1
    }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#2F2F2F', fontWeight: 500 }}>
        {title}
      </Typography>
      <Box sx={{ width: '100%', height: 'calc(100% - 40px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={processedData}
            margin={{
              top: 30,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 12, fill: '#2F2F2F' }}
              height={40}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#2F2F2F' }}
              domain={[0, (dataMax) => dataMax * 1.2]}
              tickFormatter={(value) => {
                if (!isTimeFormat) return value.toLocaleString();
                const minutes = Math.floor(value / 60);
                const seconds = value % 60;
                return `${minutes}:${seconds.toString().padStart(2, '0')}`;
              }}
            />
            <Tooltip content={<CustomTooltip isTimeFormat={isTimeFormat} />} />
            <Legend
              height={36}
              iconType="rect"
              iconSize={14}
              align="right"
              verticalAlign="top"
              wrapperStyle={{ 
                paddingTop: '-20px',
                marginTop: '-10px'
              }}
            />
            {yAxisKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                name={yAxisLabels[index]}
                stroke={colors[key]}
                strokeWidth={2}
                dot={{ fill: colors[key], r: 4 }}
                activeDot={{ r: 6 }}
                label={<CustomizedLabel stroke={colors[key]} isTimeFormat={isTimeFormat} />}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default LineChart; 