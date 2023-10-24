import {View} from "react-native";
import { margin } from "../styles/margin";

export function Frame({children}) {
    return <View style={{
        margin: margin.small,
    }}>{children}</View>
}