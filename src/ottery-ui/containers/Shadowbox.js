import styled from "styled-components";
import React from "react";
import {shadows} from "../styles/shadow"

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: ${props=>props.margin || "10px"};
    padding: ${props=>props.padding || "10px"};
    width: ${props=>props.width || "auto"};
    height: ${props=>props.height || "auto"};
    ${shadows.default}
`;

/**
 * 
 * @param props can include anything as of now it has two primary fields
 * @param props.margin is the margin of the box. can be any standard css size
 * @param props.padding is the padding of the box. can be any standard css size
 * @param props.height is the height of the box. can be any standard css size
 * @param props.width is the height of the box. can be any standard css size
 * @returns 
 */
export function Shadowbox({...props}) {
    return (
        <Main {...props} >
            {props.children}
        </Main>
    );
}

export default Shadowbox;