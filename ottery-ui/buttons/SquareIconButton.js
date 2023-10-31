import { View, StyleSheet } from "react-native";
import Button from "../buttons/Button";
import { colors } from "../styles/colors";
import { Icon, Text } from "react-native-paper";

const styles = StyleSheet.create({
    innerButton: {
        alignItems: "center",
    }
});

export function SquareIconButton({icon, width, onPress, children}) {
    const MAX_SIZE = 200;
    const ICON_SCALE = 0.5;

    return (
        <Button
            color={colors.secondary}
            onPress={onPress}
            width={width}
            height={width}
            maxHeight={MAX_SIZE}
            maxWidth={MAX_SIZE}
            shadow
        >
            <View style={styles.innerButton}>
                <Icon
                    source={icon}
                    size={(width <= MAX_SIZE) ? width * ICON_SCALE : MAX_SIZE * ICON_SCALE}
                />
                <Text variant={"titleMedium"} style={{fontWeight:"bold"}}>{children}</Text>
            </View>
        </Button>
    )
}