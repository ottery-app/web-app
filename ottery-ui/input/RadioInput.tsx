import {useState} from "react";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Image from "../image/Image";
import { image } from "../styles/image";
import { colors } from "../styles/colors";
import { border } from "../styles/border";
import { margin } from "../styles/margin";

const styles = StyleSheet.create({
    Button: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 10,
        padding: 1.5 * margin.medium,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: margin.medium
    }
})

interface FieldOption{
    key: any,
    value: string
}

interface RadioInputFieldsProps {
    current: any,
    onChange: (current: any) => void,
    options: FieldOption[]
}

export default function RadioInputFields({
    current,
    onChange=undefined,
    options=[]
}: RadioInputFieldsProps) {

    return (
        <View>
            {options.map((option, index) => {
                if(option.key === current){
                    return (<TouchableOpacity style={[styles.Button, {backgroundColor: colors.success.main}]} key={index} onPress={() => onChange(null)}>
                        <Text style={{color:colors.success.contrastText}}>{option.value}</Text>
                        <View>
                            <Image height={0.5*image.smallProfile} width={0.5*image.smallProfile} src={'checkmark'} alt={'check icon'}/>
                        </View>
                    </TouchableOpacity>)
                }
                return (<TouchableOpacity style={[styles.Button, {backgroundColor: colors.background.primary}]} key={index}  onPress={() => onChange(option.key)}>
                    <Text>{option.value}</Text>
                    <View>
                        <Image height={0.5*image.smallProfile} width={0.5*image.smallProfile} src={'xmark'} alt={'xmark icon'}/>
                    </View>
                </TouchableOpacity>)
            })}
        </View>
    )
}