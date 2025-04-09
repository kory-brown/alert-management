# Alert and Alarm Management (AAM) Dashboard

A modern, responsive dashboard for managing and monitoring alerts and alarms across healthcare facilities. Built with React and Material-UI, this dashboard provides real-time visualization of alarm data, dispatch workflows, and system metrics.

## Features

- **Alert Dispatch Workflows**
  - Manually Dispatched Alerts tracking
  - Auto Dispatched Alerts monitoring
  - Alarms Delayed visualization
  - Self Resolved/Not Sustained Alarms tracking
  - Hold Reoccurrence monitoring

- **Data Visualization**
  - Interactive Bar Charts
  - Big Number displays
  - Daily trend analysis
  - Custom date range filtering

- **Responsive Design**
  - Mobile-friendly layout
  - Collapsible filter panel
  - Consistent spacing and styling
  - Modern UI components

## Tech Stack

- React
- Material-UI (MUI)
- Recharts for data visualization
- JavaScript/ES6+

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/kory-brown/alert-management.git
cd alert-management
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will be available at `http://localhost:3000`

### Building for Production

To create a production build:
```bash
npm run build
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── BigNumberChart/
│   ├── BarChart/
│   └── ...
├── pages/             # Main page components
│   ├── AAMDashboard/
│   └── ...
├── data/              # Static data and configurations
│   └── AlarmAlertManagementData.json
└── assets/           # Static assets (images, icons)
```

## Features in Detail

### Alert Dispatch Workflow Monitoring
- Track manually and automatically dispatched alerts
- Monitor alarm delays and resolutions
- Analyze self-resolved and hold reoccurrence patterns

### Data Visualization
- Daily trend analysis with interactive charts
- Comprehensive metrics display
- Customizable date ranges and filters

### Responsive Design
- Adaptive layout for all screen sizes
- Collapsible navigation and filter panels
- Consistent spacing and component sizing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Contact

Project Owner - [@kory-brown](https://github.com/kory-brown)

Project Link: [https://github.com/kory-brown/alert-management](https://github.com/kory-brown/alert-management) 