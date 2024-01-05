import { StyleSheet, View } from "react-native";
import { margin } from "../styles/margin";

const styles = StyleSheet.create({
    main: {
        //flex: 1,
        gap: margin.small,
        alignItems:"center",
        justifyContent: "center",
        width: "100%",
        marginBottom: margin.large,
    }
});

interface FormProps {
    style?: any,
    children: any,
}

export function Form({style, children}: FormProps) {
    return <View style={[styles.main, style]}>
        {children}
    </View>
}