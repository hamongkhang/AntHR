import './App.css';
import Attendance from './components/attendance';
// import HandleOption from './components/attendance/myattendance/handleClick';
import ThemeProvider from './theme';

function App() {
  return (
   <ThemeProvider>
     <Attendance />
   </ThemeProvider>
  );
}

export default App;
