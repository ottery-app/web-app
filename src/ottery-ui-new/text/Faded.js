import { Typography } from "@mui/material";
import { colors } from "../styles/colors";
import React from "react";
import styled from "styled-components";

//litterally me
export function Faded({children}) {
    return <Typography color="disabled">{children}</Typography>
}

//changed this all lets see what happens...
// export const Faded = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin-top: 50px;
//     font-weight: 1000;
//     font-size: 30px;
//     text-align: center;
//     line-height: 80px;
//     color: ${colors.text.disabled}
// `;