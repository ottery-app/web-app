import { useEffect, useMemo, useState } from "react"
import { Main } from "../../components/Main";
import { IconCard } from "../../ottery-ui/containers/IconCard";
import {DEFAULT_IMAGES} from '../../ottery-ui/images/Image';
import {getInfo} from '../../features/user/userApi'
import {useNavigator} from '../../hooks/useNavigator';
import paths from "../../router/paths";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from './useChatClient';
import {AwaitLoad} from '../../guards/AwaitLoad';

console.log('this has userApi.getInfo');

export function Messages() {
    const {useUserId} = useAuthClient()
    const {useGetChatsFor} = useChatClient();
    const userId = useUserId()
    const chatsRes = useGetChatsFor(userId);
    let chats = chatsRes?.data?.data;

    return ( 
        <AwaitLoad status={chatsRes.status}>
            <Main>
                {chats && chats.map((chat)=>
                    <Chat chat={chat} />
                )}
            </Main>
        </AwaitLoad>
    );
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