import { Text } from 'react-native';
import {useContext, createContext} from "react";
import { colors } from './colors';

const ThemeContext = createContext();

export function ThemeProvider({children}) {
    return( 
        <ThemeContext.Provider
            value={{
                colors: colors,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

export function createTheme(theme) {
    return theme;
}