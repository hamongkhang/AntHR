import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import customTheme from '../../theme/customTheme';

const MiniTabs = (props) => {
  const { handleChange } = props;
  return (
    <Box sx={{ width: '100%' }}>
      <ThemeProvider theme={customTheme}>
        <Tabs
          value={props.value}
          onChange={handleChange}
          textColor='primary'
          indicatorColor='primary'
        >
          <Tab value="overview" label="Overview" to={`overview`} component={Link} />
          <Tab value="account" label="Account" to={`account`} component={Link} />
          <Tab value="dependents" label="Dependents" to={`dependents`} component={Link} />
          <Tab value="payroll" label="Payroll" to={`payroll`} component={Link} />
          <Tab value="documents" label="Documents" to={`documents`} component={Link} />
          <Tab value="qrcode" label="QRcode" to={`qrcode`} component={Link} />
        </Tabs>
      </ThemeProvider>
    </Box>
  );
}
export default MiniTabs;

