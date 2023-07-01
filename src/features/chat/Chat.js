import { useParams } from "react-router-dom";
import { Main } from "../../components/Main";
import { useUserId } from "../../hooks/useUserId";
import { Message } from '../../ottery-ui/chat/Message';
import { ChatBox } from "../../ottery-ui/chat/ChatBox";
import { MessageInput } from "../../ottery-ui/chat/MessageInput";
import { useEffect, useMemo, useState } from "react";
import { getChat, sendMessage } from "./chatApi";
import styled from "styled-components";
import { colors } from "../../ottery-ui/styles/colors";
import { NAV_HEIGHT } from "../../ottery-ui/footers/NavBar";
import { useScrollTo } from "../../hooks/useScrollTo";

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
    const selfId = useUserId();
    const [chat, setChat] = useState();
    const [ref, scrollTo] = useScrollTo("instant");

    const [count, setCount] = useState(0);

    useEffect(()=>{
        loadChat();
        let interval = setInterval(loadChat, 1000);

        return ()=>{
            clearInterval(interval);
        }
    }, []);

    useEffect(()=>{
        scrollTo();
    }, [chat]);

    async function loadChat() {
        const newChat = (await getChat(chatId)).data;
        setChat((oldChat)=>{
            if (!oldChat || oldChat.__v !== newChat.__v) {
                return newChat;
            } else {
                return oldChat;
            }
        });
    }

    async function send(message) {
        await sendMessage(chatId, message);
        await loadChat();
    }

    return <Main>
        <ChatBox>
            {chat?.messages.map((message, i)=>
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
} 