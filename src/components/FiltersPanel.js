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

export const drawerWidth = 320;

const FiltersPanel = ({
  startDate,
  shift,
  facility,
  utility,
  severity,
  onStartDateChange,
  onShiftChange,
  onFacilityChange,
  onUtilityChange,
  onSeverityChange,
  onApplyFilters,
  isOpen,
  onToggle,
  bed,
  onBedChange
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
            <InputLabel>Unit</InputLabel>
            <Select
              value={utility}
              label="Unit"
              onChange={(e) => onUtilityChange(e.target.value)}
            >
              <MenuItem value="unit1">Critical Care</MenuItem>
              <MenuItem value="unit2">ICU</MenuItem>
              <MenuItem value="unit3">NICU</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Bed</InputLabel>
            <Select
              value={bed}
              label="Bed"
              onChange={(e) => onBedChange(e.target.value)}
            >
              <MenuItem value="cc101">CC-101</MenuItem>
              <MenuItem value="cc102">CC-102</MenuItem>
              <MenuItem value="cc103">CC-103</MenuItem>
              <MenuItem value="cc104">CC-104</MenuItem>
              <MenuItem value="cc105">CC-105</MenuItem>
              <MenuItem value="cc106">CC-106</MenuItem>
              <MenuItem value="icu111">ICU-111</MenuItem>
              <MenuItem value="icu112">ICU-112</MenuItem>
              <MenuItem value="icu113">ICU-113</MenuItem>
              <MenuItem value="icu114">ICU-114</MenuItem>
              <MenuItem value="icu115">ICU-115</MenuItem>
              <MenuItem value="icu116">ICU-116</MenuItem>
              <MenuItem value="nicu241">NICU-241</MenuItem>
              <MenuItem value="nicu242">NICU-242</MenuItem>
              <MenuItem value="nicu243">NICU-243</MenuItem>
              <MenuItem value="nicu244">NICU-244</MenuItem>
              <MenuItem value="nicu245">NICU-245</MenuItem>
              <MenuItem value="nicu246">NICU-246</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Options Section */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Options</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={severity}
              label="Priority"
              onChange={(e) => onSeverityChange(e.target.value)}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
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