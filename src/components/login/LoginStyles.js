
import styled from "styled-components";
import {tertiary} from "../oui/styles/colors";
import { shadowDefault } from "../oui/styles/shadow";

export const Wrapper = styled.div`
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    width: 100%;
`;

export const RegisterField = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    padding: 20px;
    padding-bottom: 0;
    ${shadowDefault}
`;

export const LoginField = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid ${tertiary};
    margin: 20px;
    padding: 20px;
    ${shadowDefault}
`;

export const NewAccount = LoginField;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    row-gap: 10px;
`;

export const Error = styled.div`
    color: red;
    padding: 15px;
`;