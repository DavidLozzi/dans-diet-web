import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const myTheme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        background: '#ff0000'
      }
    },
    MuiContainer: {
      root: {
        margin: '10px'
      }
    },
    MuiTextField: {
      root: {
        marginTop: '1rem'
      }
    },
    MuiTypography: {
      h1: {
        fontSize: '2.5rem'
      },
      h2: {
        fontSize: '2rem'
      }
    }
  }
});

const myThemeResponsive = responsiveFontSizes(myTheme);

export default myThemeResponsive;