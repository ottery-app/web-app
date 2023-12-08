import { StyleSheet } from "react-native";
import { margin } from "../../../../ottery-ui/styles/margin";
import { colors } from "../../../../ottery-ui/styles/colors";

const styles = StyleSheet.create({
    headerText: {
        textAlign: 'center',
        padding: margin.large,
        color: colors.text.tertiary,
    }
});

export const fadedStyle = styles.headerText;

export const fadedVariant="headlineSmall";