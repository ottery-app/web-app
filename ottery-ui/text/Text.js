import { Text as Txt } from "react-native"
import { colors } from "../styles/colors";


export function Text({children, color=colors.text.primary, onPress}) {
    return <Txt style={{color, fontSize:16}} onPress={onPress}>{children}</Txt>;
}