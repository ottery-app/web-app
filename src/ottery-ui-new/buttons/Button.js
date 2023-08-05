import React from "react"
import styled from 'styled-components';
import { radius as rad } from "../styles/radius";
import { colors as cols } from "../styles/colors";
import { clickable } from "../styles/clickable";
// import { BUTTON_TYPES } from "./button.enum";
import {Button as ButtonMui, ThemeProvider, Typography, useTheme} from "@mui/material";

const Butt = styled.button`
    border: ${props=>`${props.border} solid ${props.secondaryColor}`};
    background-color: ${props=>props.primaryColor};
    color: ${props=>props.primaryTextColor};
    border-radius: ${props=>props.radius};
    min-height: ${props=>props.height};
    min-width: ${props=>props.width};
    width: 100%;
    max-width: ${props=>(props.width)?props.width:clickable.maxWidth};
    text-transform: uppercase;
    &:hover{
        ${clickable.onHover}
    }
`;

function pipeStyles(type, colors) {
    if (type==="outline") {
        return {
            primaryColor: "inherit",
            secondaryColor: colors.primary.main,
            primaryTextColor: colors.primary.main,
            border: "2px",
        };
    } else if (type === "text") {
        return {
            primaryColor: "inherit",
            secondaryColor: colors.primary.main,
            primaryTextColor: colors.primary.main,
            border: "0px",
        };
    } else if (type === "filled") {
        return {
            primaryColor: colors.primary.main,
            secondaryColor: colors.secondary.main,
            primaryTextColor: colors.text.primary,
            border: "1px",
        };
    }
}

/**
 * This is the Button component. It is a button with an onClick callback.
 * It has three states that it is able to be in filled (default), outline, and text.
 * @param {function} onClick - The callback to be called when the button is clicked.
 * @param {string} type - The type of button. Can be outline, filled, or text.
 * @param {string} diameter - The diameter of the button. Should be in any css size format.
 * @param {string} primaryColor - The primary color of the button. This can be either a hex code or a color name. The primary color is used to modify the background color of the button.
 * @param {string} secondaryColor - The secondary color of the button. This can be either a hex code or a color name. The secondary color is used to modify the border color of the button.
 * @param {string} primaryTextColor - The primary text color of the button. This can be either a hex code or a color name. The primary text color is used to modify the text color of the button.
 * @param {string} radius - The radius of the button. Should be in any css size format.
 * @param {*} children - The children of the button. This is the what will be displayed on the button.
 * @param {string} height - The height of the button. Should be in any css size format.
 * @param {string} width - The width of the button. Should be in any css size format.
 * @returns {React.Component} The button component.
 */
export function Button({
    children,
    onClick,
    palette,
    variant="contained",
    disabled
}) {
    const theme = useTheme({palette});

    return (
        <ThemeProvider theme={theme}>
            <ButtonMui
                sx={{
                    width:"100%",
                }}
                variant={variant}
                disabled={disabled}
                onClick={onClick}
            >
                <Typography>
                    {children}
                </Typography>
            </ButtonMui>
        </ThemeProvider>
    );
}