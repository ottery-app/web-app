import { useParams } from "react-router-dom";
import { Main } from "../../components/Main";
import { Message } from '../../ottery-ui/chat/Message';
import { ChatBox } from "../../ottery-ui/chat/ChatBox";
import { MessageInput } from "../../ottery-ui/chat/MessageInput";
import { useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../ottery-ui/styles/colors";
import { NAV_HEIGHT } from "../../ottery-ui/footers/NavBar";
import { useScrollTo } from "../../hooks/useScrollTo";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from './useChatClient';
import {AwaitLoad} from '../../guards/AwaitLoad';
import { API_ENV } from "../../env/api.env";

const InputFiller = styled.div`
    height: ${NAV_HEIGHT};
`;

const Input = styled(Main)`
    position: fixed;
    left: 0;
    bottom: ${NAV_HEIGHT};
    background: ${colors.primary};
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

    useEffect(scrollTo, [getChat]);

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
                <Input><MessageInput onSend={send}/></Input>
            </Main>
        </AwaitLoad>
    );
}