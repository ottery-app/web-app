import React from "react";
import styled from 'styled-components';

import { clickable } from "../styles/clickable";
import { colors } from "../styles/colors";
import { radius as rad } from "../styles/radius";
import { useMemo } from "react";
import useColors from "../hooks/useColors";

/*
border-radius:${props=>props.radius};
background-color:${props=>props.primaryColor};
border:${props=>`2px solid ${props.secondaryColor}`};
 */
const Frame = styled.div`
    padding-bottom:20px;
    display:flex;
    flex-direction:column;
    height:100%;
    width: 100%;
    background-color: ${colors.background.primary};
    border-radius: ${props=>props.radius};
`;

const Content = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow-y:auto;
    height:100%;
`;

const Header = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto ${clickable.minWidth};
    align-items: center;
    min-height: ${clickable.minHeight};
`;

const Item = styled.div`
    width: 95%;
    margin: 5px;
`;

const Title = styled.div`
    color: ${colors.text.primary};
    text-align:left;
    padding: 0px 20px;
    text-transform: capitalize;
`;

//I dont like this. Since it fails to use the AddActionButton and also is so small and useless. 
const Add = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${clickable.minHeight};
    width: ${clickable.minWidth};

    &:hover {
        ${clickable.onHover}
    }
`;

export default function UnorderedList({
    title,
    onClick,
    children,
    radius = rad.default,
}) {

    return(
        <Frame radius={radius}>
            {(title || onClick)
                ?<Header>
                    <Title>{title}</Title>
                    {onClick && <Add onClick={onClick}>&#43;</Add>}
                </Header>
                :undefined
            }

            <Content>
                {(children && children.length) ? children.map((element, i) => {
                    return <Item key={i}>{element}</Item>
                }): <Item>{children}</Item>}
            </Content>
        </Frame>
    );
}