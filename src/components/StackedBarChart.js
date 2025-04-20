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

const StackedBarChart = ({ 
  title,
  description, 
  data,
  groupBy = 'Category',
  colors = ['#1aafe6', '#667275']
}) => {
  // Process the data to format required by Recharts
  const processedData = data.map(item => ({
    groupBy: item.groupByLabel,
    [item.totalLabel]: item.totalValue,
    [`${item.totalLabel}Only`]: item.totalValue - item.subsetValue,
    [item.subsetLabel]: item.subsetValue
  }));

  // Get the labels from the first data item (assuming all items have same labels)
  const { totalLabel, subsetLabel } = data[0];

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
              dataKey="groupBy"
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
              formatter={(value, name, props) => {
                // For Alarms (totalLabel), show the total value
                if (name === `${totalLabel}Only`) {
                  return [props.payload[totalLabel].toLocaleString(), totalLabel];
                }
                // For other items (Alerts), show the actual value
                return [value.toLocaleString(), name];
              }}
              itemSorter={(item) => {
                return item.name === `${totalLabel}Only` ? -1 : 1;
              }}
            />
            <Legend 
              align="right"
              verticalAlign="top"
              wrapperStyle={{ 
                paddingTop: '-20px',
                marginTop: '-10px'
              }}
              formatter={(value) => {
                if (value === `${totalLabel}Only`) {
                  return totalLabel;
                } else if (value === subsetLabel) {
                  return subsetLabel;
                } else if (value === totalLabel) {
                  return totalLabel;
                }
                return value;
              }}
              payload={[
                { value: totalLabel, type: 'square', color: colors[0] },
                { value: subsetLabel, type: 'square', color: colors[1] }
              ]}
            />
            {/* Stack order: subset at bottom, remaining total on top */}
            <Bar 
              dataKey={subsetLabel}
              name={subsetLabel}
              stackId="stack"
              fill={colors[1]}
            >
              <LabelList
                dataKey={subsetLabel}
                position="center"
                fill="#fff"
                fontSize={12}
                formatter={(value) => value.toLocaleString()}
              />
            </Bar>
            <Bar 
              dataKey={`${totalLabel}Only`}
              name={`${totalLabel}Only`}
              stackId="stack"
              fill={colors[0]}
            >
              <LabelList
                dataKey={totalLabel}
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

export default StackedBarChart; 