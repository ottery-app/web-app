import { View } from "react-native"
import { margin } from "../styles/margin"
import React from "react";

export function ButtonSpan({children}) {
    return <View>
        <View style={{
            //flex:1, 
            flexDirection:"row", 
            gap: margin.small, 
            alignItems:"center", 
            justifyContent:"center",
            flexWrap: 'wrap',
        }}>
            {children}
        </View>
    </View>
}