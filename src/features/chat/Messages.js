import { useEffect, useMemo, useState } from "react"
import { getChatsFor } from "./chatApi"
import { Main } from "../../components/Main";
import { IconCard } from "../../ottery-ui/containers/IconCard";
import {DEFAULT_IMAGES} from '../../ottery-ui/images/Image';
import {getInfo} from '../../features/user/userApi'
import {useNavigator} from '../../hooks/useNavigator';
import paths from "../../router/paths";
import { useAuthClient } from "../auth/useAuthClient";

export function Messages() {
    const {useUserId} = useAuthClient()
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
    const {useUserId} = useAuthClient()
    const selfId = useUserId();
    const navigator = useNavigator();
    const message = useMemo(()=>chat.messages[chat.messages.length - 1], [chat])
    const [users, setUsers] = useState('');
    const [image, setImage] = useState(DEFAULT_IMAGES.pfp);

    useEffect(()=>{
        const users = chat.users.filter((id)=>id!==selfId);
        getInfo(users).then((res)=>{
            let names = res.data
                .map((user)=>user.firstName + " " + user.lastName)
                .join(',');

            setImage(res.data[0].pfp.src);
            setUsers(names);
        });
    }, []);

    return (
        <IconCard
            onClick={()=>navigator(paths.social.chat, {chatId:chat._id})}
            image={image}
            title={users}
            time={message?.date}
        >
            {message?.message}
        </IconCard>
    );
}