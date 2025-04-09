import React from 'react';
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Button,
  IconButton
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const FiltersPanel = ({
  startDate,
  shift,
  facility,
  utility,
  severity,
  category,
  onStartDateChange,
  onShiftChange,
  onFacilityChange,
  onUtilityChange,
  onSeverityChange,
  onCategoryChange,
  onApplyFilters,
  isOpen,
  onToggle
}) => {
  return (
    <Box sx={{ 
      position: 'relative',
      p: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <IconButton
        onClick={onToggle}
        sx={{
          position: 'absolute',
          right: '8px',
          top: '8px',
          backgroundColor: '#1aafe6',
          border: '1px solid #e0e0e0',
          boxShadow: '2px 0 4px rgba(0,0,0,0.2)',
          width: '32px',
          height: '32px',
          minWidth: '32px',
          padding: 0,
          '&:hover': {
            backgroundColor: '#1590c0'
          },
          zIndex: 1,
          color: 'white'
        }}
      >
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>

      <Typography variant="h6" sx={{ mb: 3, mt: 1 }}>
        Filters
      </Typography>

      <Stack spacing={2}>
        {/* Date Section */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Date Range</Typography>
          <TextField
            fullWidth
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Shift</InputLabel>
            <Select
              value={shift}
              label="Shift"
              onChange={(e) => onShiftChange(e.target.value)}
            >
              <MenuItem value="day">Day</MenuItem>
              <MenuItem value="night">Night</MenuItem>
              <MenuItem value="swing">Swing</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Location Section */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Location</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Facility</InputLabel>
            <Select
              value={facility}
              label="Facility"
              onChange={(e) => onFacilityChange(e.target.value)}
            >
              <MenuItem value="facility1">Facility 1</MenuItem>
              <MenuItem value="facility2">Facility 2</MenuItem>
              <MenuItem value="facility3">Facility 3</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Utility</InputLabel>
            <Select
              value={utility}
              label="Utility"
              onChange={(e) => onUtilityChange(e.target.value)}
            >
              <MenuItem value="utility1">Utility 1</MenuItem>
              <MenuItem value="utility2">Utility 2</MenuItem>
              <MenuItem value="utility3">Utility 3</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Options Section */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Options</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Severity</InputLabel>
            <Select
              value={severity}
              label="Severity"
              onChange={(e) => onSeverityChange(e.target.value)}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <MenuItem value="category1">Category 1</MenuItem>
              <MenuItem value="category2">Category 2</MenuItem>
              <MenuItem value="category3">Category 3</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          onClick={onApplyFilters}
          sx={{
            mt: 'auto',
            backgroundColor: '#1aafe6',
            '&:hover': {
              backgroundColor: '#1590c0'
            }
          }}
        >
          Apply Filters
        </Button>
      </Stack>
    </Box>
  );
};

export default FiltersPanel; 