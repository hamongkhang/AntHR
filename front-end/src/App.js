import './App.css';
import { Box } from '@mui/system';
import ThemeProvider from './theme';
import EmployeeAttend from './components/attendance/employee/page2';
import MyAttend from './components/attendance/myattendance/page1';


function App() {
  return (
    <ThemeProvider>
      <Box sx={{ width: '100%', bgcolor: 'background.secondary' }}>
        <EmployeeAttend />
        <MyAttend />
      </Box>
    </ThemeProvider>
  );
}

export default App;
