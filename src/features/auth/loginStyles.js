import styled from "styled-components";
import { margin } from "../../ottery-ui/styles/margin";

export const Main = styled.div`
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${margin.medium};
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    row-gap: 10px;
`;