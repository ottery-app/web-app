import styled from "styled-components";
import { margin } from "../ottery-ui/styles/margin";

const Base = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    width:100%;
`; 

export const Main = styled(Base)`
    box-sizing: border-box;
    padding: ${margin.small};
`;

export const MarginlessMain = Base;