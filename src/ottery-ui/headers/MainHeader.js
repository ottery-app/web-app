import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../styles/colors";
import { zindex } from "../styles/zindex";

export const MainHeaderHeight = "60px";

const Header = styled.div`
    background-color: ${props=>props.color.main};
    border-bottom: 1px solid ${props=>props.color.dark};
    height: ${props=>props.height};
    position: sticky; top: 0;
    z-index: ${zindex.absolute};
`;

const forAll = `
    height: ${props=>props.height};
    margin: 7px 10px;
`;

const Item = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Left = styled.span`
    ${forAll}
    display: float;
    float: left;
`;

const Main = styled.span`
    height: ${props=>props.height};
    display: float;
    float: left;
`;

const Right = styled.span`
    ${forAll}
    display: float;
    float: right;
`;

export default function MainHeader({
    main,
    left,
    right,
    height=MainHeaderHeight,
    color=colors.primary
}) {
    return (
        <Header
            color={color}
            height = {height}
        >
            {left && <Left><Item>{left}</Item></Left>}
            {main && <Main><Item>{main}</Item></Main>}
            {right && <Right><Item>{right}</Item></Right>}
        </Header>
    )
}