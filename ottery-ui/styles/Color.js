import { DefaultTheme, Provider as PaperProvider, useTheme } from 'react-native-paper';
import useColors from './useColors';
import {View} from "react-native";
import { colors } from './colors';
import { useMemo } from 'react';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary.main,
        onPrimary: colors.primary.contrastText,
        primaryContainer: colors.primary.dark,
        onPrimaryContainer: colors.primary.contrastText,
        secondary: colors.secondary.main,
        onSecondary: colors.secondary.contrastText,
        secondaryContainer: colors.secondary.dark,
        onSecondaryContainer: colors.secondary.contrastText,
        tertiary: colors.tertiary.main,
        onTertiary: colors.tertiary.contrastText,
        tertiaryContainer: colors.tertiary.dark,
        onTertiaryContainer: colors.tertiary.contrastText,
        error: colors.error.main,
        onError: colors.error.contrastText,
        errorContainer: colors.error.dark,
        onErrorContainer: colors.error.contrastText,
        background: colors.background.primary,
        onBackground: colors.text.primary,
        surface: colors.background.primary,
        onSurface: colors.text.primary,
        surfaceVariant: colors.background.secondary,
        onSurfaceVariant: colors.text.primary,
        outline: colors.primary.dark,
        outlineVariant: colors.secondary.dark,

        surface: colors.primary.main,

        elevation: {
            level1: colors.background.primary,
            level2: colors.background.primary,
        }

        // inverseSurface: "rgb(50, 47, 51)",
        // inverseOnSurface: "rgb(245, 239, 244)",
        // inversePrimary: "rgb(220, 184, 255)",
    }
}

export function ThemeProvider({children}) {
    return( 
        <PaperProvider theme={theme}>
            {children}
        </PaperProvider>
    );
}

export function useThemeMaker({primary=undefined, status=undefined}) {
    let theme = useTheme();

    if (status === "loading") {
        status = "disabled";
    }

    primary = useColors({color: primary, status});

    return useMemo(()=>{
        if (primary) {
            primary = {
                primary: primary?.main, // Your primary color
                onPrimary: primary?.contrastText, // Text color on the primary background
                primaryContainer: primary?.dark, // Background color for primary container
                onPrimaryContainer: primary?.contrastText, // Text color on the primary container background
            }
        }

        return {
            ...theme,
            colors: {
                ...theme.colors,
                ...primary,
            }
        }
    }, [theme, primary]);
}

//to be used internally
export function Color({children, primary, status=undefined}) {
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