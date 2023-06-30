import { useParams } from "react-router-dom";
import { Main } from "../../../components/Main";
import { useUserId } from "../../../hooks/useUserId";
import { Message } from '../../../ottery-ui/chat/Message';
import { ChatBox } from "../../../ottery-ui/chat/ChatBox";
import { MessageInput } from "../../../ottery-ui/chat/MessageInput";

export function Chat() {
    const {chatId} = useParams();
    const selfId = useUserId();

    function sendMessage(message) {
        console.log(message);
    }

    return <Main>
        <ChatBox>
            <Message self={true}>{selfId}{selfId}{selfId}{selfId}{selfId}</Message>
            <Message>{chatId}</Message>
        </ChatBox>
        <MessageInput onSend={sendMessage}/>
    </Main>
} 