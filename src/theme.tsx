import { createMuiTheme } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';

// Building a custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[900],
      light: '#7c42bd',
      dark: '#12005e',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ace520',
      light: '#e2ff5e',
      dark: '#77b300',
      contrastText: '#4a148c',
    },
  },
});

export default theme;
