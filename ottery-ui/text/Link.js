import { colors } from "../styles/colors"
import { Text } from "react-native-paper";

export function Link({children, onPress, variant}) {
    return <Text variant={variant} style={{color:colors.text.hyperlink}} onPress={onPress}>{children}</Text>;
}