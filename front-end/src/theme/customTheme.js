import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

const primaryColor = orange[300];
const secondaryColor = 'rgb(26, 32, 39)'
const customTheme = createTheme({
    palette: {
      primary: {
        main: primaryColor
      },
      secondary: {
        main: secondaryColor
      }
    }
  });

export default customTheme