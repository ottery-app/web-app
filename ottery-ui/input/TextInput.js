import * as React from 'react';
import { TextInput as InternalTextInput } from 'react-native-paper';
import { colors } from '../styles/colors';
import { makeValidator, useValidator } from './useValidator';
import { Color } from '../styles/Color';

export default function TextInput({
    color=colors.primary,
    value = "",
    label,
    placeholder, //used if you only want a placeholder
    onChange,
    delay,
    mode="outlined",
    password,
    status,
    validator=makeValidator(status),
}) {
    const validatorStatus = useValidator(validator, value, delay);

    return(
        <Color primary={color} status={status||validatorStatus}>
            <InternalTextInput
                secureTextEntry={!!password}
                mode={mode}
                placeholder={placeholder}
                label={label}
                value={value}
                onChangeText={text => onChange(text)}
            />
        </Color>
    );
}