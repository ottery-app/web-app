import { colors } from './colors';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {useContext} from "react";

const ThemeContext = useContext();

export function ThemeProvider({children}) {
    return( 
        <ThemeContext.Provider>
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