import { Main } from "../../components/Main";
import { IconCard } from "../../ottery-ui/containers/IconCard";
import {DEFAULT_IMAGES} from '../../ottery-ui/images/Image';
import {getInfo} from '../../features/user/userApi'
import {useNavigator} from '../../hooks/useNavigator';
import paths from "../../router/paths";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from './useChatClient';
import {AwaitLoad} from '../../guards/AwaitLoad';
import { useUserClient } from "../user/useUserClient";

export function Messages() {
    const {useUserId} = useAuthClient()
    const {useGetChatsFor} = useChatClient();
    const userId = useUserId()
    const chatsRes = useGetChatsFor({inputs:[userId]});
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
    const {useUserId} = useAuthClient();
    const {useGetUserInfo} = useUserClient();

    const selfId = useUserId();
    const navigator = useNavigator();
    const flagUserLoad = useGetUserInfo(chat.users.filter((id)=>id!==selfId)[0]);

    const flagUser = flagUserLoad?.data?.data[0];
    const message = chat.messages[chat.messages.length - 1];

    return (
        <AwaitLoad status={flagUserLoad.status}>
            <IconCard
                onClick={()=>navigator(paths.social.chat, {chatId:chat._id})}
                image={flagUser?.pfp.src || DEFAULT_IMAGES.pfp}
                title={flagUser?.firstName + " " + flagUser?.lastName}
                time={message?.date}
            >
                {message?.message}
            </IconCard>
        </AwaitLoad>
    );
}