import {makeInputStyle} from "./BaseInput";
import styled from "styled-components";
import { colors } from "../styles/colors";
import { makeValidator } from "./hooks/useValidator";
import useValidator from "./hooks/useValidator";
import useColors from "../hooks/useColors";
import { clickable } from "../styles/clickable";
import { inputType } from "ottery-dto/lib/types/input/input.enums";

const I = styled.textarea`
    ${props=>makeInputStyle(props)}
    height: ${clickable.maxHeight};
`;

const Main = styled.div`
    width:100%;
    transform: translate(-2px);
`;

export const AREA = inputType.AREA;

export default function AreaInput({
    type="text", //this is just here to make making other types of input easier
    color=colors.primary,
    value = "",
    label,
    onChange,
    delay = 0,
    validator=makeValidator("default"),
}) {
    const status = useValidator(validator, value, delay);
    const colors = useColors({status, color,});

    return(
        <Main>
            <I
                color={colors}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={label}
            />
        </Main>
    );
} 