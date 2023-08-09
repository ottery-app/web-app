import React from "react";
import styled from "styled-components";
import {colors} from "../styles/colors";

const Main = styled.div`
    color: ${colors.error.main};
    display: inline;
`;

export default function Error({
    children,
}) {
    return (
        <Main>{children}</Main>
    );
}