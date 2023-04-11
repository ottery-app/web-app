import styled from "styled-components";
import { margin } from "../../../ottery-ui/styles/margin";

export const Main = styled.div`
    width: 100%;
`;

export const Form= styled.div`
    display:flex;
    margin: ${margin.medium};
    gap: ${margin.large};
    justify-content:center;
    align-items:center;
    flex-direction: column;
`;

export const Head = styled.div`
    font-weight: bold;
`;