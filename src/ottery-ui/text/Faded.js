import { colors } from "../styles/colors";
import React from "react";
import styled from "styled-components";

const Faded = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    font-weight: 1000;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: ${colors.textPale}
`;

//litterally me
export default Faded;