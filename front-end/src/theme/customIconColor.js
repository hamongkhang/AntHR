import { createTheme } from "@mui/material/styles";

const primaryColor = "#ee9ca7";
const secondaryColor = "#38ef7d";
const inforColor = "#4286f4";
const errorColor = "#FF4B2B";
const warningColor = "#F7DC6F";
const customIconColor = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    info: {
      main: inforColor,
    },
    error: {
      main: errorColor,
    },
    warning: {
      main: warningColor,
    },
  },
});

export default customIconColor;
