import { useEffect, useMemo, useState } from "react"
import { useUserId } from "../../hooks/useUserId"
import { getChatsFor } from "./chatApi"
import { Main } from "../../components/Main";
import { formatDate } from "../../functions/time";
import { IconCard } from "../../ottery-ui/containers/IconCard";
import {DEFAULT_IMAGES} from '../../ottery-ui/images/Image';
import { H_TYPES, Title } from "../../ottery-ui/text/Title";

export function Messages() {
    const userId = useUserId()
    const [chats, setChats] = useState([]);

    useEffect(()=>{
        getChatsFor(userId)
            .then((res)=>{
                setChats(res.data);
            })
    }, []);

    return <Main>
        {chats.map((chat)=>
            <Chat chat={chat} />
        )}
    </Main>
}

export function Chat({chat}) {
    const message = useMemo(()=>chat.messages[chat.messages.length - 1], [])

    return ( 
        <IconCard image={DEFAULT_IMAGES.pfp}>
            <Title h={H_TYPES.four} margin={'0px'}>{"asdf"}</Title>
            <div>{message.message}</div>
            <div>{formatDate(message.date)}</div>
        </IconCard>
    );
}