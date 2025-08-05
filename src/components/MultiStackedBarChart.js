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
  ResponsiveContainer,
  LabelList
} from 'recharts';

const MultiStackedBarChart = ({
  title,
  description,
  data,
  xAxisKey = 'groupByLabel',
  yAxisKeys = [],
  yAxisLabels = [],
  colors = [],
  showValueLabels = false
}) => {
  // Calculate total for each group
  const processedData = data.map(item => ({
    ...item,
    total: yAxisKeys.reduce((sum, key) => sum + (item[key] || 0), 0)
  }));

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
      {description && (
        <Typography variant="body2" gutterBottom sx={{ color: '#666666' }}>
          {description}
        </Typography>
      )}
      <Box sx={{ width: '100%', height: 'calc(100% - 40px)' }}>
        <ResponsiveContainer>
          <RechartsBarChart
            data={processedData}
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
              domain={[0, 750]}
              ticks={[0, 150, 300, 450, 600, 750]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              formatter={(value, name) =>
                typeof value === 'number' ? value.toLocaleString() : value
              }
            />
            <Legend
              align="right"
              verticalAlign="top"
              wrapperStyle={{
                paddingTop: '-20px',
                marginTop: '-10px'
              }}
              payload={yAxisKeys.map((key, idx) => ({
                value: yAxisLabels[idx] || key,
                type: 'square',
                color: colors[idx] || '#8884d8'
              }))}
            />
            {yAxisKeys.map((key, idx) => (
              <Bar
                key={key}
                dataKey={key}
                name={yAxisLabels[idx] || key}
                stackId="stack"
                fill={colors[idx] || '#8884d8'}
              >
                {showValueLabels && idx === yAxisKeys.length - 1 && (
                  <LabelList
                    dataKey="total"
                    position="top"
                    fill="#2F2F2F"
                    fontSize={14}
                    formatter={value => (typeof value === 'number' ? value.toLocaleString() : value)}
                  />
                )}
              </Bar>
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default MultiStackedBarChart; 