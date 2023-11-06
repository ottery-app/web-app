import {useState} from "react";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Image from "../image/Image";
import { image } from "../styles/image";
import { radius } from "../styles/radius";
import { colors } from "../styles/colors";
import { border } from "../styles/border";
import { margin } from "../styles/margin";

const styles = StyleSheet.create({
    Button: {
        flexDirection: 'row',
        width: '100%',
        borderColor: colors.secondary.contrastText,
        borderWidth: border.thin,
        borderRadius: 50,
        padding: 1.5 * margin.medium,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: margin.medium
    }
})

interface FieldOption{
    key: string,
    value: string
}

interface RadioInputFieldsProps {
    current: FieldOption,
    onChange: (current: FieldOption) => void,
    options: FieldOption[]
}

export default function RadioInputFields({
    current=undefined,
    onChange=undefined,
    options=[]
}: RadioInputFieldsProps) {

    const [curr, setCurrent] = useState((current && options.includes(current) ? current : undefined) ?? options[0].key);


    useEffect(()=>{
        if(onChange == undefined){
            onChange(current);
        }
    },[current]);

    return (
        <View>
            {options.map((option, index) => {
                if(option === curr){
                    return (<TouchableOpacity style={[styles.Button, {backgroundColor: colors.success.main}]} key={index} onPress={() => setCurrent(null)}>
                        <Text>{option.value}</Text>
                        <View>
                            <Image height={0.5*image.smallProfile} width={0.5*image.smallProfile} src={'check'} alt={'check icon'}/>
                        </View>
                    </TouchableOpacity>)
                }
                return (<TouchableOpacity style={[styles.Button, {backgroundColor: colors.background.secondary}]} key={index}  onPress={() => setCurrent(option)}>
                    <Text>{option.value}</Text>
                    <View>
                        <Image height={0.5*image.smallProfile} width={0.5*image.smallProfile} src={'x'} alt={'check icon'}/>
                    </View>
                </TouchableOpacity>)
            })}
        </View>
    )
}