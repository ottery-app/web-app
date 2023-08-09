import { useEffect, useState } from "react";
import styled from "styled-components";
import { clickable } from "../styles/clickable";
import { colors } from "../styles/colors";
import { radius } from "../styles/radius";
import IconButton from "../buttons/IconButton";

const Item = styled.div`
    margin: 10px;
    margin-left: 20px;
    font-size: 1.2em;
`;

const Main = styled.div`
    width: 100%;
    height: ${clickable.minHeight};
    border-radius: ${radius.default};
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${props=>{
        if (props.checked) {
            return `
                background: ${colors.success.main};
                color: ${colors.success.contrastText};
            `;
        } else {
            return `
                background: ${colors.background.secondary};
                color: ${colors.text.primary}; 
            `;
        }
    }}

    &:hover{
        ${clickable.onHover}
    }
`;

export function LongCheckboxInput({
    children,
    onChange=()=>{},
    checked,
}) {
    const [iconProps, setIconProps] = useState({});

    function handleChange() {
        onChange({
            target: {
                value: !checked,
            },
        });
    };

    useEffect(()=>{
        if (checked) {
            setIconProps({
                primaryTextColor:colors.textLight,
                icon:"check",
            })
        } else {
            setIconProps({
                primaryTextColor:colors.textDark,
                icon:"x",
            })
        }
    }, [checked]);

    return <Main
        checked={checked}
        onClick={handleChange}
    >
        <Item>{children}</Item>
        <Item>
            <IconButton {...iconProps}/>
        </Item>
    </Main>
}