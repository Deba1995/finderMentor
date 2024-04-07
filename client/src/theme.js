import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#331D2C",
    },
    secondary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: "Raleway, sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

export default theme;
