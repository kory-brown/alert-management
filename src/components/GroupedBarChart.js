import React from 'react';
import { Box, Typography } from '@mui/material';
import { 
  BarChart as RechartsBarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

const COLORS = ['#1aafe6', '#667275', '#ff9c6e', '#65bce8', '#8fc9eb', '#ffd666', '#87d068', '#f759ab'];

const GroupedBarChart = ({ title, data, xAxisKey = 'date', dataKeys = [], labels = [], colors = COLORS }) => {
  // If labels are not provided, use dataKeys as labels
  const barLabels = labels.length > 0 ? labels : dataKeys;
  
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
        <ResponsiveContainer>
          <RechartsBarChart
            data={data}
            margin={{
              top: 30,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={xAxisKey}
              tick={{ fill: '#2F2F2F', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#2F2F2F' }}
              domain={[0, (dataMax) => dataMax * 1.2]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <Legend 
              align="right"
              verticalAlign="top"
              wrapperStyle={{ 
                paddingTop: '-20px',
                marginTop: '-10px'
              }}
            />
            {dataKeys.map((key, index) => (
              <Bar 
                key={key}
                dataKey={key}
                name={barLabels[index]}
                fill={colors[index % colors.length]}
                label={{ position: 'top', fill: '#2F2F2F', fontSize: 12 }}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default GroupedBarChart; 