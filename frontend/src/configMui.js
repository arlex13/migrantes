import { createTheme } from "@mui/material/styles";

export const themeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#17527F",
      light: "#1f868d",
      dark: "#875100",
    },
    secondary: {
      main: "#ea4a3c",
      dark: "#340041",
      light: "#90519b",
    },
  },
  shape: {
    borderRadius: "0.5rem",
  },
  typography: {
    fontFamily: "Roboto",
    button: {
      textTransform: "none",
      fontWeight: "bold",
      fontSize: "1rem",
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        colorPrimary: {
          color: "black",
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot

        containedPrimary: {
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          padding: "0.4rem 3rem 0.4rem 3rem",
          border: "0.15rem solid #20878e",
          "&:hover": {
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            backgroundColor: "#ffffff",
            color: "#20878e",
            border: "0.15rem solid #20878e",
          },
        },
        containedSecondary: {
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
          padding: "0.4rem 3rem 0.4rem 3rem",
          border: "0.15rem solid #ea4a3c",
          "&:hover": {
            boxShadow:
              "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
            backgroundColor: "#ffffff",
            color: "#ea4a3c",
            border: "0.15rem solid #ea4a3c",
          },
        },
      },
    },
  },
};

export default createTheme(themeOptions);
