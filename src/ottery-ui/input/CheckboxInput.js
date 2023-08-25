import { colors } from "../styles/colors";
import { radius } from "../styles/radius";
import { clickable } from "../styles/clickable";
import styled from "styled-components";
import { useState, createElement } from "react";
import { ABRCHECKBOX } from "./AbrCheckBoxInput";
import { margin } from "../styles/margin";
import { useEffect } from "react";
import { inputType } from "ottery-dto/lib/types/input/input.enums";

const Container = styled.div`
    display: block;
    height: 35px;
    width: 35px;

    & div {
        border-radius: ${radius.round};
        display:flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    &:hover {
        ${clickable.onHover}
    }
`;

const Checked = styled.div`
    color: ${props=>props.color.contrastText};
    font-weight:bold;
    background: ${props=>props.color.main};
`;

const Label = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: ${margin.small};
`;

export const CHECKBOX = inputType.CHECKBOX;

export default function CheckboxInput({
    value,
    label,
    onChange=()=>{},
    checked,
    position,
}) {
    const [status, setStatus] = useState(checked);

    useEffect(()=>{
        setStatus(checked);
    },[checked]);

    function handleChange() {
        setStatus(p=>{
            p = !p;
            const e = {
                target: {
                    value:p,
                },
                for: value,
            }
            onChange(e);
            return  p;
        });
    }

    return (
        <FitLabel 
            onChange={handleChange}
            component={Checked}
            label={label}
            position={position}
            status={status}
        />
    )
}

function FitLabel({
    component,
    label,
    position,
    onChange,
    status,
}) {
    if (position===ABRCHECKBOX) {
        return(
            <Container onClick={onChange}>
                {createElement(component, {
                    color:  (status) ? colors.primary : colors.disabled,
                    children: label,
                })}
            </Container>
        )
    } else {
        return (
            <Label onClick={onChange}>
                {label}
                <Container>
                    {createElement(component, {
                        color:  (status) ? colors.success : colors.error,
                        children: (status) ? <>&#10004;</> : <>&#x2716;</>,
                    })}
                </Container>
            </Label>
        );
    }
}