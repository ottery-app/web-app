import { DefaultTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import useColors from './useColors';
import {View} from "react-native";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    }
}

export function ThemeProvider({children}) {
    return( 
        <PaperProvider theme={theme}>
            {children}
        </PaperProvider>
    );
}

//to be used internally
export function Color({children, primary, status}) {
    const theme = useTheme();
    //If you need a second color then add secondary
    primary = useColors({color: primary, status});

    if (primary) {
        primary = {
            primary: primary?.main, // Your primary color
            onPrimary: primary?.contrastText, // Text color on the primary background
            primaryContainer: primary?.dark, // Background color for primary container
            onPrimaryContainer: primary?.contrastText, // Text color on the primary container background
        }
    }

    return(
        <View style={{width:"100%", height:"100%"}}>
            <PaperProvider
                theme={{
                    ...theme,
                    colors: {
                        ...theme.colors,
                        ...primary,
                    }
                }}
            >
                {children}
            </PaperProvider>
        </View>
    );
}