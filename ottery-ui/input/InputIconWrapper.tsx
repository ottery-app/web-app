import {View, StyleSheet, TouchableOpacity} from "react-native";
import Image from "../image/Image";
import { clickable } from "../styles/clickable";
import { radius } from "../styles/radius";
import { ImageAsset } from "../../assets/ImageAsset";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection:"row",
        justifyContent: "center",
        alignItems:"center",
        width: "100%",
    },
    input: {
        flex: 9,
    },
    icon: {
        flex: 1,
    },
})

export interface InputIconWrapperProps {
    children: any,
    icon: ImageAsset,
    onPress: ()=>void,
}

export function InputIconWrapper({children, icon, onPress}: InputIconWrapperProps) {
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                {children}
            </View>
            <TouchableOpacity onPress={onPress} style={styles.icon}>
                <Image src={icon} alt={"input icon"} height={clickable.minHeight} width={clickable.minHeight} radius={radius.round}/>
            </TouchableOpacity>
        </View>
    );
}