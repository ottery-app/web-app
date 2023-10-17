import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { margin } from '../styles/margin';
import { clickable } from '../styles/clickable';
import { shadows } from '../styles/shadow';
import useColors from '../hooks/useColors';
import { BUTTON_STATES, BUTTON_TYPES } from './Button.enum';
import { colors } from '../styles/colors';
import { radius as rad } from '../styles/radius';
import { Text } from '../text/Text';

const style = StyleSheet.create({})

const styles = props => StyleSheet.create({
    button: {
        borderColor: props.color.dark,
        backgroundColor: props.color.main,
        borderRadius: props.radius,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: margin.small,
        minHeight: props.height,
        minWidth: props.height,
        width: "100%",
        maxWidth: (props.width !== undefined)?props.width:clickable.maxWidth,
        ...shadows.default,
    },
    text: {
        color: props.color.contrastText,
        fontWeight: "bold", 
    }
})

function pipeStyles(type, color) {
    if (type==="outline") {
        return {
            color: color,
            border: 2,
        };
    } else if (type === "text") {
        return {
            color: color,
            border: 0,
        };
    } else if (type === "filled") {
        return {
            color: color,
            border: 1,
        };
    }
}

export const Button = ({ 
    color=colors.primary,
    radius=rad.default,
    type=BUTTON_TYPES.filled,
    width,
    height=clickable.minHeight,
    onClick,
    onPress = onClick,
    state=BUTTON_STATES.default,
    children 
}) => {
    color = useColors({color, status:state});
    const style = styles({radius, width, height, ...pipeStyles(type, color)})


    return (
        <TouchableOpacity style={style.button} onPress={onPress}>
            <Text color={color.contrastText}>{children}</Text>
        </TouchableOpacity>
    );
};

export default Button;