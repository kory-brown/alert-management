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

// Utility function to format column headers
const formatColumnHeader = (key) => {
  // Special case for acceptedAndAutoEscalated column
  if (key === 'acceptedAndAutoEscalated') {
    return 'Accepted & Auto Escalated';
  }
  
  // Special cases for abbreviations that should remain uppercase
  const upperCaseTerms = ['CCU', 'ICU', 'ED', 'SK', 'RT'];
  
  // First, handle any special uppercase terms
  const containsUpperCaseTerm = upperCaseTerms.some(term => key.toUpperCase().includes(term));
  if (containsUpperCaseTerm) {
    return key.split(/(?=[A-Z])/).map(part => {
      return upperCaseTerms.includes(part.toUpperCase()) ? part.toUpperCase() : (
        part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
      );
    }).join(' ');
  }

  // For regular words, split on capital letters and capitalize each word
  const words = key
    // First, split the string on capital letters
    .split(/(?=[A-Z])/)
    // Then split any remaining lowercase words
    .flatMap(word => word.split(/(?=[A-Z])/))
    // Remove any empty strings
    .filter(word => word.length > 0)
    // Capitalize each word
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  return words.join(' ');
};

const TableChart = ({ title, data, description, style }) => {
  // Generate headers from the first data object
  const generateHeaders = () => {
    if (!data || data.length === 0) return [];
    
    return Object.keys(data[0]).map(key => ({
      id: key,
      label: formatColumnHeader(key),
      // Use style prop if provided, otherwise default to type-based alignment
      align: style && style[key]?.align 
        ? style[key].align 
        : (typeof data[0][key] === 'number' ? 'right' : 'left')
    }));
  };

  const headers = generateHeaders();

  return (
    <Box sx={{ 
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography
        variant="h6"
        sx={{
          px: 2,
          py: 1.5,
          fontWeight: 600,
          color: '#2F2F2F'
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          px: 2,
          pb: 1,
          color: '#666'
        }}
      >
        {description}
      </Typography>
      <TableContainer 
        component={Paper} 
        sx={{ 
          flex: 1,
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