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

const AlarmTypesBarChart = ({ title, data }) => {
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
            />
            <Legend 
              align="right"
              verticalAlign="top"
              wrapperStyle={{ 
                paddingTop: '-20px',
                marginTop: '-10px'
              }}
            />
            <Bar 
              dataKey="ventricularTachycardia" 
              name="Ventricular Tachycardia" 
              fill="#1aafe6"
              label={{ position: 'top', fill: '#2F2F2F', fontSize: 12 }}
            />
            <Bar 
              dataKey="ventricularFibrillation" 
              name="Ventricular Fibrillation" 
              fill="#667275"
              label={{ position: 'top', fill: '#2F2F2F', fontSize: 12 }}
            />
            <Bar 
              dataKey="asystole" 
              name="Asystole" 
              fill="#ff9c6e"
              label={{ position: 'top', fill: '#2F2F2F', fontSize: 12 }}
            />
            <Bar 
              dataKey="bradycardia" 
              name="Bradycardia" 
              fill="#65bce8"
              label={{ position: 'top', fill: '#2F2F2F', fontSize: 12 }}
            />
            <Bar 
              dataKey="tachycardia" 
              name="Tachycardia" 
              fill="#8fc9eb"
              label={{ position: 'top', fill: '#2F2F2F', fontSize: 12 }}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default AlarmTypesBarChart; 