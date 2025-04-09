import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

const TableChart = ({ title, data }) => {
  // Determine if this is the destination response table based on the data structure
  const isDestinationTable = data[0]?.hasOwnProperty('d1AvgResponseTime');

  // Define column headers based on table type
  const getHeaders = () => {
    if (isDestinationTable) {
      return [
        { id: 'alarmLabel', label: 'Alarm Label', align: 'left' },
        { id: 'd1AvgResponseTime', label: 'D1 AvgRT', align: 'right' },
        { id: 'd1SK1', label: 'D1 SK #1', align: 'right' },
        { id: 'd1SK2', label: 'D1 SK #2', align: 'right' },
        { id: 'd1SK3', label: 'D1 SK #3', align: 'right' },
        { id: 'd1Auto', label: 'D1 Auto', align: 'right' },
        { id: 'd2AvgResponseTime', label: 'D2 AvgRT', align: 'right' },
        { id: 'd2SK1', label: 'D2 SK #1', align: 'right' },
        { id: 'd2SK2', label: 'D2 SK #2', align: 'right' },
        { id: 'd2SK3', label: 'D2 SK #3', align: 'right' },
        { id: 'd2Auto', label: 'D2 Auto', align: 'right' },
        { id: 'd3AvgResponseTime', label: 'D3 AvgRT', align: 'right' },
        { id: 'd3SK1', label: 'D3 SK #1', align: 'right' },
        { id: 'd3SK2', label: 'D3 SK #2', align: 'right' },
        { id: 'd3SK3', label: 'D3 SK #3', align: 'right' },
        { id: 'd3Auto', label: 'D3 Auto', align: 'right' },
        { id: 'd4AvgResponseTime', label: 'D4 AvgRT', align: 'right' },
        { id: 'd4SK1', label: 'D4 SK #1', align: 'right' },
        { id: 'd4SK2', label: 'D4 SK #2', align: 'right' },
        { id: 'd4SK3', label: 'D4 SK #3', align: 'right' },
        { id: 'd4Auto', label: 'D4 Auto', align: 'right' }
      ];
    } else {
      return [
        { id: 'alarmLabel', label: 'Alarm Label', align: 'left' },
        { id: 'category', label: 'Category', align: 'left' },
        { id: 'priority', label: 'Priority', align: 'left' },
        { id: 'avgDuration', label: 'Avg Duration', align: 'right' },
        { id: 'manualEscalations', label: 'Manual Escalations', align: 'right' },
        { id: 'autoEscalations', label: 'Auto Escalations', align: 'right' },
        { id: 'notSustained', label: 'Not Sustained', align: 'right' },
        { id: 'avgAlarmDuration', label: 'Avg Alarm Duration', align: 'right' },
        { id: 'avgADEscalationTime', label: 'Avg AD Escalation Time', align: 'right' },
        { id: 'snippetsCreated', label: 'Snippets Created', align: 'right' },
        { id: 'softKeyResponses', label: 'Soft Key Responses', align: 'left' },
        { id: 'destinations', label: 'Destinations', align: 'left' },
        { id: 'avgResolutionDuration', label: 'Avg Resolution Duration', align: 'right' },
        { id: 'autoAfterDelay', label: 'Auto After Delay', align: 'right' }
      ];
    }
  };

  const headers = getHeaders();

  return (
    <Box sx={{ 
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      <Typography
        variant="h6"
        sx={{
          p: 2,
          fontWeight: 600,
          color: '#2F2F2F'
        }}
      >
        {title}
      </Typography>
      <TableContainer 
        component={Paper} 
        sx={{ 
          maxHeight: 600,
          '& .MuiPaper-root': {
            boxShadow: 'none'
          }
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell
                  key={header.id}
                  align={header.align}
                  sx={{
                    backgroundColor: '#f5f5f5',
                    fontWeight: 600,
                    color: '#2F2F2F',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: '#fafafa',
                  },
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  }
                }}
              >
                {headers.map((header) => (
                  <TableCell
                    key={header.id}
                    align={header.align}
                    sx={{
                      color: '#2F2F2F',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {row[header.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableChart; 