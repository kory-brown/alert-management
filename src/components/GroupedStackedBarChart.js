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
  xAxisKey = 'date',
  colors,
  keys,
  labels,
  flattenLegend = false
}) => {
  if (!colors || !colors.low || !colors.medium || !colors.high) {
    throw new Error('GroupedStackedBarChart requires colors prop with low, medium, and high color arrays');
  }

  // Process data to calculate the "only" values (total minus subset)
  const processedData = data.map(item => ({
    ...item,
    lowAlarmsOnly: item.lowAlarms - item.lowAlerts,
    mediumAlarmsOnly: item.mediumAlarms - item.mediumAlerts,
    highAlarmsOnly: item.highAlarms - item.highAlerts,
    lowTotal: item.lowAlarms,
    mediumTotal: item.mediumAlarms,
    highTotal: item.highAlarms
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
      {flattenLegend && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, mb: 1, pr: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 16, height: 16, backgroundColor: colors.low[0], borderRadius: 0.5, mr: 1 }} />
            <Typography variant="body2">{labels.low}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 16, height: 16, backgroundColor: colors.medium[0], borderRadius: 0.5, mr: 1 }} />
            <Typography variant="body2">{labels.medium}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 16, height: 16, backgroundColor: colors.high[0], borderRadius: 0.5, mr: 1 }} />
            <Typography variant="body2">{labels.high}</Typography>
          </Box>
        </Box>
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
              domain={[0, (dataMax) => dataMax * 1.2]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              formatter={(value, name) => {
                const priority = name.toLowerCase().replace('alarmsonly', '').replace('alarms', '').replace('alerts', '');
                const type = name.toLowerCase().includes('alerts') ? 'Alerts' : 'Alarms';
                return [value, `${labels[priority]} ${type}`];
              }}
            />
            {!flattenLegend && (
              <Legend 
                align="right"
                verticalAlign="top"
                wrapperStyle={{ 
                  paddingTop: '-20px',
                  marginTop: '-10px'
                }}
                formatter={(value) => {
                  const priority = value.toLowerCase().replace('alarmsonly', '').replace('alarms', '').replace('alerts', '');
                  const type = value.toLowerCase().includes('alerts') ? 'Alerts' : 'Alarms';
                  return `${labels[priority]} ${type}`;
                }}
              />
            )}
            
            {/* Low Priority */}
            <Bar 
              dataKey="lowAlerts"
              stackId="low"
              fill={colors.low[1]}
            >
              <LabelList
                dataKey="lowAlerts"
                position="center"
                fill="#fff"
                fontSize={12}
              />
            </Bar>
            <Bar 
              dataKey="lowAlarmsOnly"
              stackId="low"
              fill={colors.low[0]}
            >
              <LabelList
                dataKey="lowTotal"
                position="top"
                fill="#2F2F2F"
                fontSize={12}
              />
            </Bar>

            {/* Medium Priority */}
            <Bar 
              dataKey="mediumAlerts"
              stackId="medium"
              fill={colors.medium[1]}
            >
              <LabelList
                dataKey="mediumAlerts"
                position="center"
                fill="#fff"
                fontSize={12}
              />
            </Bar>
            <Bar 
              dataKey="mediumAlarmsOnly"
              stackId="medium"
              fill={colors.medium[0]}
            >
              <LabelList
                dataKey="mediumTotal"
                position="top"
                fill="#2F2F2F"
                fontSize={12}
              />
            </Bar>

            {/* High Priority */}
            <Bar 
              dataKey="highAlerts"
              stackId="high"
              fill={colors.high[1]}
            >
              <LabelList
                dataKey="highAlerts"
                position="center"
                fill="#fff"
                fontSize={12}
              />
            </Bar>
            <Bar 
              dataKey="highAlarmsOnly"
              stackId="high"
              fill={colors.high[0]}
            >
              <LabelList
                dataKey="highTotal"
                position="top"
                fill="#2F2F2F"
                fontSize={12}
              />
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default GroupedStackedBarChart; 