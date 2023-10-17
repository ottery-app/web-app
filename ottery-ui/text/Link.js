import { colors } from "../styles/colors"
import { Text } from "./Text"

export function Link({children, onPress}) {
    return <Text color={colors.text.hyperlink} onPress={onPress}>{children}</Text>;
}