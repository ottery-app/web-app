import { View } from "react-native"
import { margin } from "../styles/margin"

export function ButtonSpan({children}) {
    return <View style={{flex:1, flexDirection:"row", gap: margin.small, alignItems:"center", justifyContent:"center"}}>
        {children}
    </View>
}