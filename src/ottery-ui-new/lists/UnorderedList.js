import React from "react";
import styled from 'styled-components';
import { clickable } from "../styles/clickable";

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
    background-color: ${props=>props.secondaryColor};
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

/**
 * UnorderedList is used to display a list of items in a container while provinding an optional way to add new items.
 * If the onClick is excluded the option to add new items is not available.
 * @param {string} id - The id of the list.
 * @param {string} className - The class name of the list.
 * @param {string} title - The title of the list.
 * @param {*} children - The children of the list that are displayed as a list.
 * @param {function} onClick - The callback function that is called when the add button is clicked.
 * @returns 
 */
export function UnorderedList({
    title,
    onClick,
    children,
}) {

    return(
        <Frame>
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