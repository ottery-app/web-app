import * as React from 'react';
import { TextInput as InternalTextInput } from 'react-native-paper';
import { colors } from '../styles/colors';
import useColors from '../hooks/useColors';
import { StyleSheet, View } from 'react-native';
import { makeValidator, useValidator } from './useValidator';

const styles = props=>StyleSheet.create({
    container: {
      width: '100%',
      transform: [{ translateX: -2 }],
    },
});

export default function TextInput({
    color=colors.primary,
    value = "",
    label,
    placeholder, //used if you only want a placeholder
    onChange,
    delay = 0,
    mode="outlined",
    password,
    status,
    validator=makeValidator(status),
}) {
    const validatorStatus = useValidator(validator, value);
    
    color = useColors({
        status:status || validatorStatus,
        color:color
    });

    const style = styles();

    return(
        <View style={style.container}>
            <InternalTextInput
                secureTextEntry={!!password}
                mode={mode}
                placeholder={placeholder}
                label={label}
                value={value}
                outlineColor={color.main}
                activeOutlineColor={color.dark}
                onChangeText={text => onChange(text)}
            />
        </View>
    );
}