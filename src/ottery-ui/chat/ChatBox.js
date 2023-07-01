import styled from "styled-components";
import { margin } from "../styles/margin";

const Chat = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${margin.medium};
`;

export function ChatBox({children}) {
    return <Chat>
        {children}
    </Chat>
}