import { MultiFieldHeader } from "../../../ottery-ui/headers/MultiFieldHeader";
import { useAuthClient } from "../auth/useAuthClient";
import { useSocialClient } from "../social/useSocialClient";
import { useUserClient } from "./useUserClient";
import { useMemo, useState } from "react";
import { ImageButton } from "../../../ottery-ui/buttons/ImageButton";
import { MarginlessMain } from "../../../ottery-ui/containers/Main";
import { ImageButtonList } from "../../../ottery-ui/containers/ImageButtonList";
import { pfp } from "../../../assets/icons";
import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";
import { useChatClient } from "../chat/useChatClient";

enum Tabs {
    children = "Children",
    friends = "Friends",
    events = "Events",    
}

export function UserProfile() {
    const navigator = useNavigator();

    const userId = useAuthClient().useUserId();
    const userRes = useUserClient().useGetUserInfo({inputs:[userId]});
    const userData = userRes?.data?.data[0];
    const userEventsRes = useUserClient().useGetUserEvents({inputs:[userId]});
    const userEvents = userEventsRes?.data?.data;
    const userChildrenRes = useUserClient().useGetUserChildren({inputs:[userId]});
    const userChildren = userChildrenRes?.data?.data;
    const userFriendsRes = useSocialClient().useGetFriends({inputs: [userId]});
    const userFriends = userFriendsRes?.data?.data;
    const userFriendIds = userFriends?.map(friend=>friend._id);
    const chatIdsRes = useChatClient().useGetDirectChats({
        inputs:[userId, userFriendIds],
        enabled: !!userFriendIds,
    });
    const chatIdMap = chatIdsRes?.data;

    const [tab, setTab] = useState("Children");
    const data = useMemo(()=>{
        if (userEvents && userFriends && userChildren) {
            var data = {};
            data[Tabs.events] = userEvents;
            data[Tabs.friends] = userFriends;
            data[Tabs.children] = userChildren;
        }
        return data;
    }, [userChildren, userFriends, userEvents]);

    const buttons = useMemo(()=>data && data[tab]?.map((data)=>{
        const props = {
            key: data._id,
        }

        const image = {src:data?.pfp?.src, aspectRatio:1} || pfp;

        if (tab === Tabs.children) {
            return <ImageButton 
                {...props}
                right={image}
                onPress={()=>navigator(paths.main.child.profile, {childId: data._id})}
            >
                {data.firstName} {data.lastName}
            </ImageButton>
        } else if (tab === Tabs.events) {
            return <ImageButton 
                {...props}
                onPress={()=>navigator(paths.main.event.dash, {eventId: data._id})}
            >
                    {data.summary}
            </ImageButton>
        } else if (tab === Tabs.friends) {
            return <ImageButton 
                {...props}
                right={image}
                onPress={()=>navigator(paths.main.social.chat, {chatId: chatIdMap[data._id]})}
            >
                {data.firstName} {data.lastName}
            </ImageButton>
        }
    }) || [], [data, tab, chatIdMap]);

    return (
        <MarginlessMain>
            <MultiFieldHeader
                src={userData?.pfp}
                title={userData?.firstName + " " + userData?.lastName}
                tab={tab}
                onTab={(tab)=>{setTab(tab)}}
                tabs={Object.values(Tabs)}
            />
            <ImageButtonList>
                {buttons}
            </ImageButtonList>
        </MarginlessMain>
    );
}