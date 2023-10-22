import React from 'react';
import { colors } from '../styles/colors';
import { radius as rad } from '../styles/radius';
import { Button as ButtonPaper } from 'react-native-paper';
import { BUTTON_STATES, BUTTON_TYPES } from './button.enum';
import { Color } from '../styles/Color';
import { clickable } from '../styles/clickable';

export const Button = ({ 
    color=colors.primary,
    type=BUTTON_TYPES.filled,
    onPress,
    state=BUTTON_STATES.default,
    children,
    radius=rad.default,
    width,
}) => {
    return (
        <Color primary={color} status={state}>
            <ButtonPaper
                borderRadius={rad.default}
                onPress={onPress}
                style={{
                    borderRadius: radius, 
                    width: width,
                    padding: 0,
                    margin: 0,
                }}
                mode={type}
            >{children}</ButtonPaper>
        </Color>
    );
};

export default Button;