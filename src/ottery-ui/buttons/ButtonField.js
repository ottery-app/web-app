import {margin} from "../styles/margin";
import styled from "styled-components";

const Buttons = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    gap: ${margin.small};
    width: 100%;
`;

export default function ButtonField({children}) {
    return <Buttons>{children}</Buttons>
}