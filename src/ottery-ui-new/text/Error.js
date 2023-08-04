import React from "react";
import styled from "styled-components";
import {colors} from "../styles/colors";

const Main = styled.div`
    color: ${colors.error.main};
    display: inline;
`;

/**
 * 
 * @param id is the id of the link
 * @param className is the name of any classes attached to the link
 * @param children are the contents of the link
 */
export default function Error({
    id,
    className="oui-error",
    children,
}) {
    return (
        <Main
            id={id}
            className={className}
        >
            {children}
        </Main>
    );
}