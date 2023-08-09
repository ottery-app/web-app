import Button from "./Button";
import styled from 'styled-components';
import React from "react";

import { colors } from "../styles/colors";
import { radius as rad } from "../styles/radius";
import { clickable } from "../styles/clickable";
import useColors from "../hooks/useColors";

const Plus = styled.div`
    font-weight:bold;
`

export default function CheckButton({
    type="filled",
    diameter = clickable.minHeight,
    color=colors.primary,
    radius = rad.round,
    onClick,
}) {
    color = useColors({color});

    return (
        <Button
            type={type}
            width={diameter}
            height={diameter}
            color={color}
            radius={radius}
            onClick={onClick}
        >
            <Plus>&#10004;</Plus>
        </Button>
    );
}