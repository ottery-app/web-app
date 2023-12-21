import {View, StyleSheet, TouchableOpacity} from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../styles/colors";
import Button from "../buttons/Button";
import { clickable } from "../styles/clickable";
import { margin } from "../styles/margin";
import { radius } from "../styles/radius";
import { InputProps } from "./Input";

export interface CheckBoxProps extends InputProps<boolean> {
    mode?: CheckBoxMode,
}

const text_varient = "titleMedium";

export enum CheckBoxMode {
    default="default",
    filled="filled",
}

const stylesBox = (checked)=>StyleSheet.create({
    box: {
        backgroundColor: (checked) ? colors.success.main : colors.disabled.main,
        color: (checked) ? colors.success.contrastText : colors.disabled.contrastText,
    }
})

const stylesDefault = StyleSheet.create({
    main: {
        flexDirection: "row",
        alignItems: "center",
        gap: margin.medium,
    }
})

const stylesFilled = StyleSheet.create({
    main: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: margin.medium,
        width:"100%",
        borderRadius: radius.default,
    },
    inner: {
        padding: margin.large,
    }
});

export function CheckBox({
    value,
    label,
    onChange,
    mode=CheckBoxMode.filled
}: CheckBoxProps) {

    function Icon({active}) {
        return (active)
            ? <Text variant={text_varient} style={stylesBox(active).box}>&#10004;</Text>
            : <Text variant={text_varient} style={stylesBox(active).box}>&#x2716;</Text>
    }

    return (mode === CheckBoxMode.default) 
        ?(
            <View style={stylesDefault.main}>
                <Button
                    width={clickable.minWidth}
                    height={clickable.minHeight}
                    onPress={()=>onChange(!value)}
                    color={(value)?colors.success:colors.disabled}
                >
                        <Icon active={value}/>
                </Button>
                <Text variant={text_varient}>{label}</Text>
            </View>
        ):(
            <TouchableOpacity style={[stylesFilled.main, stylesBox(value).box]} onPress={()=>{onChange(!value)}}>
                <View style={[stylesFilled.main, stylesFilled.inner, stylesBox(value).box]}>
                    <Text style={stylesBox(value).box} variant={text_varient}>{label}</Text>
                    <Icon active={value} />
                </View>
            </TouchableOpacity>
        )
}