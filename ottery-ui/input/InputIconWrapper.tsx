import {View, StyleSheet, TouchableOpacity} from "react-native";
import Image from "../image/Image";
import { clickable } from "../styles/clickable";
import { margin } from "../styles/margin";
import { ImageDto } from "@ottery/ottery-dto";

const styles = StyleSheet.create({
    container:{
        //flex: 1,
        flexDirection:"row",
        justifyContent: "center",
        alignItems:"center",
        gap: margin.small,
        width: "100%",
        height: clickable.minHeight * 2,
        padding: margin.small,
    },
    input: {
        flex: 9,
        justifyContent: "center",
        alignItems:"center",
    },
    icon: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        transform: [{translateX: 0}, {translateY: 1}],
    },
})

export interface InputIconWrapperProps {
    children: any,
    icon: ImageDto,
    onPress: ()=>void,
}

export function InputIconWrapper({children, icon, onPress}: InputIconWrapperProps) {
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                {children}
            </View>
            <TouchableOpacity onPress={onPress} style={styles.icon}>
                <Image src={icon} alt={"input icon"} height={clickable.minHeight} width={clickable.minHeight}/>
            </TouchableOpacity>
        </View>
    );
}