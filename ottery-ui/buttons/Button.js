import React from 'react';
import { colors } from '../styles/colors';
import { radius as rad } from '../styles/radius';
import { Button as ButtonPaper } from 'react-native-paper';
import { BUTTON_STATES, BUTTON_TYPES } from './button.enum';
import { Color } from '../styles/Color';
import { shadows } from '../styles/shadow';

export const Button = ({ 
    color=colors.primary,
    type=BUTTON_TYPES.filled,
    onPress,
    state=BUTTON_STATES.default,
    children,
    radius=rad.default,
    width,
    maxWidth,
    minWidth,
    height,
    maxHeight,
    minHeight,
    shadow,
}) => {
    const BUTTON_STYLE = {
        width: width,
        maxWidth: maxWidth,
        minWidth: minWidth,
        height: height,
        maxHeight: maxHeight,
        minHeight: minHeight,
        borderRadius: radius,
    }

    return (
        <Color primary={color} status={state}>
            <ButtonPaper
                styles={shadows.default}
                borderRadius={rad.default}
                onPress={onPress}
                contentStyle={BUTTON_STYLE}
                labelStyle={BUTTON_STATES}
                style={[shadow && shadows.default, BUTTON_STYLE]}
                mode={type}
                compact={true}
            >{children}</ButtonPaper>
        </Color>
    );
};

export default Button;