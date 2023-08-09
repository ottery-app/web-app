import styled from "styled-components";
import React from "react";
import {colors} from "../styles/colors";

const HyperLink = styled.a`
    color: ${colors.text.hyperlink};
    display: inline;
    &:hover {
        cursor: pointer;
    }
`;

/**
 * 
 * @param id is the id of the link
 * @param className is the name of any classes attached to the link
 * @param children are the contents of the link
 * @param href is the destination of the link
 * @param onClick is the on click callback 
 */
export default function Link({
    children,
    href,
    onClick,
}) {
    return (
        <HyperLink
            onClick={onClick}
            href={href}
        >
            {children}
        </HyperLink>
    )
}