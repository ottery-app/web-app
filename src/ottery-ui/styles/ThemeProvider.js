import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

const theme = createTheme({palette: colors})

export function ThemeProvider({children}) {
    return( 
        <MuiThemeProvider theme={theme}>
            {children}
        </MuiThemeProvider>
    );
}