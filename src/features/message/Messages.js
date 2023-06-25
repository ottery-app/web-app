import { useEffect, useMemo, useState } from "react"
import { useUserId } from "../../hooks/useUserId"
import { getChatsFor } from "./chatApi"
import { Main } from "../../components/Main";

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

    return <div>
        <div>{"asdf"}</div>
        <div>{message.message}</div>
        <div>{message.date}</div>
    </div>
}