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

const GroupedStackedBarChart = ({ 
  title,
  description, 
  data,
  groupBy = 'Category',
  colors,
  flattenLegend = false
}) => {
  if (!colors || !colors.low || !colors.medium || !colors.high) {
    throw new Error('GroupedStackedBarChart requires colors prop with low, medium, and high color arrays');
  }

  // Custom payload for the simplified legend
  const simplifiedLegendPayload = [
    { value: 'Low', color: colors.low[0], type: 'rect' },
    { value: 'Medium', color: colors.medium[0], type: 'rect' },
    { value: 'High', color: colors.high[0], type: 'rect' }
  ];

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
              dataKey="date"
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
              formatter={(value, name) => {
                return [value.toLocaleString(), name];
              }}
            />
            <Legend 
              align="right"
              verticalAlign="top"
              wrapperStyle={{ 
                paddingTop: '-20px',
                marginTop: '-10px'
              }}
              payload={flattenLegend ? simplifiedLegendPayload : undefined}
            />
            {/* Low Severity Group */}
            <Bar 
              dataKey="lowAlerts"
              name="Low - Alerts"
              stackId="low"
              fill={colors.low[0]}
            >
              <LabelList
                dataKey="lowAlerts"
                position="center"
                fill="#fff"
                fontSize={12}
                formatter={(value) => value.toLocaleString()}
              />
            </Bar>
            <Bar 
              dataKey="lowAlarmsOnly"
              name="Low - Alarms"
              stackId="low"
              fill={colors.low[1]}
            >
              <LabelList
                dataKey="lowTotal"
                position="top"
                fill="#2F2F2F"
                fontSize={12}
                formatter={(value) => value.toLocaleString()}
              />
            </Bar>

            {/* Medium Severity Group */}
            <Bar 
              dataKey="mediumAlerts"
              name="Medium - Alerts"
              stackId="medium"
              fill={colors.medium[0]}
            >
              <LabelList
                dataKey="mediumAlerts"
                position="center"
                fill="#fff"
                fontSize={12}
                formatter={(value) => value.toLocaleString()}
              />
            </Bar>
            <Bar 
              dataKey="mediumAlarmsOnly"
              name="Medium - Alarms"
              stackId="medium"
              fill={colors.medium[1]}
            >
              <LabelList
                dataKey="mediumTotal"
                position="top"
                fill="#2F2F2F"
                fontSize={12}
                formatter={(value) => value.toLocaleString()}
              />
            </Bar>

            {/* High Severity Group */}
            <Bar 
              dataKey="highAlerts"
              name="High - Alerts"
              stackId="high"
              fill={colors.high[0]}
            >
              <LabelList
                dataKey="highAlerts"
                position="center"
                fill="#fff"
                fontSize={12}
                formatter={(value) => value.toLocaleString()}
              />
            </Bar>
            <Bar 
              dataKey="highAlarmsOnly"
              name="High - Alarms"
              stackId="high"
              fill={colors.high[1]}
            >
              <LabelList
                dataKey="highTotal"
                position="top"
                fill="#2F2F2F"
                fontSize={12}
                formatter={(value) => value.toLocaleString()}
              />
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default GroupedStackedBarChart; 