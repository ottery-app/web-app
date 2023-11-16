import { margin } from "../styles/margin";
import { CheckBox, CheckBoxMode } from "./CheckBox"
import { StyleSheet, View } from "react-native";

export interface RadioInputOption{
    key: any,
    value: string
}

export interface RadioInputProps {
    current: any,
    onChange: (current: any) => void,
    options: RadioInputOption[],
    mode: CheckBoxMode,
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "column",
        gap: margin.medium,
    }
});

export function RadioInput({
    current,
    onChange=undefined,
    options,
    mode,
}: RadioInputProps) {
    return (
        <View style={styles.main}>
            {options.map((option)=>
                <CheckBox 
                    mode={mode}
                    value={option.key === current}
                    label={option.value}
                    onChange={()=>{onChange(option.key)}}
                />
            )}
        </View>
    )
}