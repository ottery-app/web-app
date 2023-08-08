import { useParams } from "react-router-dom";
import { Main } from "../../components/Main";
import { Message } from '../../ottery-ui-new/chat/Message';
import { ChatBox } from "../../ottery-ui-new/chat/ChatBox";
import { MessageInput } from "../../ottery-ui-new/input/MessageInput";
import { useEffect } from "react";
import styled from "styled-components";
import { NAV_HEIGHT } from "../../ottery-ui-new/footers/NavBar";
import { useScrollTo } from "../../hooks/useScrollTo";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from './useChatClient';
import {AwaitLoad} from '../../guards/AwaitLoad';
import { API_ENV } from "../../env/api.env";
import { margin } from "../../ottery-ui-new/styles/margin";

const InputFiller = styled.div`
    padding: ${margin.small};
    height: ${NAV_HEIGHT};
`;

const InputBackdrop = styled(Main)`
    position: fixed;
    left: 0;
    bottom: ${NAV_HEIGHT};
    background: white;
`;

export function Chat() {
    const {chatId} = useParams();
    const {useGetChat, useSendMessage} = useChatClient();
    const [ref, scrollTo] = useScrollTo("instant");
    const getChat = useGetChat({
        inputs: [chatId],
        refetchInterval: API_ENV.query_delta,
        refetchIntervalInBackground: true,
    });
    const sendMessage = useSendMessage();
    const {useUserId} = useAuthClient()
    const selfId = useUserId();
    const messages = getChat?.data?.data.messages

    useEffect(scrollTo, [getChat.dataUpdatedAt]);

    function send(message) {
        sendMessage.mutate([chatId, message]);
    }

    return (
        <AwaitLoad status={getChat.status}>
            <Main>
                <ChatBox>
                    {messages?.map((message, i)=>
                        <Message 
                            self={message.sender === selfId}
                            date={message.date}
                            key={i}
                        > 
                            {message.message}
                        </Message>
                    )}
                </ChatBox>
                <InputFiller ref={ref}/>
                <InputBackdrop><MessageInput onSend={send}/></InputBackdrop>
            </Main>
        </AwaitLoad>
    );
}