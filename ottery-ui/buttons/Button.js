import React from 'react';
import { colors } from '../styles/colors';
import { radius as rad, radius } from '../styles/radius';
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
    width,
    maxWidth,
    minWidth,
    height,
    maxHeight,
    minHeight,
    shadow,
}) => {
    return (
        <Color primary={color} status={state}>
            <ButtonPaper
                styles={shadows.default}
                borderRadius={rad.default}
                onPress={onPress}
                contentStyle={{
                    width: width,
                    maxWidth: maxWidth,
                    minWidth: minWidth,
                    height: height,
                    maxHeight: maxHeight,
                    minHeight: minHeight,
                }}
                style={[
                    shadow && shadows.default,
                    {
                        borderRadius: radius.default, 
                        width: width,
                        maxWidth: maxWidth,
                        minWidth: minWidth,
                        height: height,
                        maxHeight: maxHeight,
                        minHeight: minHeight,
                    }
                ]}
                mode={type}
            >{children}</ButtonPaper>
        </Color>
    );
};

export default Button;