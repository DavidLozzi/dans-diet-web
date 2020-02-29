import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3493EB'
    },
    secondary: {
      main: '#3fc3bb'
    }
  },
  overrides: {
    container: {
      root: {
        margin: '10px'
      }
    },
    MuiButton: {
      root: {
        marginTop: '1rem'
      }
    },
    MuiTextField: {
      root: {
        marginTop: '1.5rem'
      }
    }
  },
  typography: {
    h1: {
      fontSize: 2.3
    },
    h2: {
      fontSize: 2.0
    },
    h3: {
      fontSize: 1.8
    },
    h4: {
      fontSize: 1.5
    }
  }
});

const myThemeResponsive = responsiveFontSizes(myTheme);

export default myThemeResponsive;