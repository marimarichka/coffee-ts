import { createTheme } from "@mui/material";
import { COLOR_PINK } from "./constants";

export const theme = createTheme({
  palette: {
    primary: {
      main: COLOR_PINK,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#e7ada0",
          },
          borderRadius: "6px",
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          "&:hover": {
            color: "white",
          },
          "&.Mui-active": {
            "&&": {
              color: "white",
            },
          },
        },
      },
    },
  },
});
