import React from 'react';
import { colors } from '../styles/colors';
import { radius as rad, radius } from '../styles/radius';
import { Button as ButtonPaper } from 'react-native-paper';
import { BUTTON_STATES, BUTTON_TYPES } from './button.enum';
import { Color } from '../styles/Color';

export const Button = ({ 
    color=colors.primary,
    type=BUTTON_TYPES.filled,
    onPress,
    state=BUTTON_STATES.default,
    children,
    width,
}) => {
    return (
        <Color primary={color} status={state}>
            <ButtonPaper
                borderRadius={rad.default}
                onPress={onPress}
                style={{
                    borderRadius: radius.default, 
                    width: width
                }}
                mode={type}
            >{children}</ButtonPaper>
        </Color>
    );
};

export default Button;