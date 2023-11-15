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
import { BUTTON_STATES } from "../../../ottery-ui/buttons/button.enum";
import SelectionButton from "../../../ottery-ui/buttons/SelectionButton"
import { Text } from "react-native-paper";
import ImageInput from "../../../ottery-ui/input/ImageInput";
import { TouchableOpacity } from "react-native";

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
    const userFriendIds = userFriendsRes?.data?.data;
    const friendsRes = useUserClient().useGetUserInfo({
        inputs: [userFriendIds],
        enabled: !!userFriendIds,
    });
    const userFriends = friendsRes?.data?.data;
    const chatIdsRes = useChatClient().useGetDirectChats({
        inputs:[userId, userFriendIds],
        enabled: !!userFriendIds,
    });
    const chatIdMap = chatIdsRes?.data;

    const [tab, setTab] = useState("Children");
    const data = useMemo(()=>{
        if (userEvents && userFriends && userChildren) {
            var data = {};
            data[Tabs.events] = userEvents.map((event)=>{
                return <ImageButton 
                    key={event._id}
                    onPress={()=>navigator(paths.main.event.dash, {eventId: event._id})}
                >
                    <Text>{event.summary}</Text>
                </ImageButton>
            });
            data[Tabs.friends] = userFriends.map((friend)=>{
                console.log(friend._id)
                return <ImageButton 
                    key={friend._id}
                    right={{src:friend?.pfp?.src, aspectRatio:1} || pfp}
                    onPress={()=>navigator(paths.main.social.chat, {chatId: chatIdMap[friend._id]})}
                >
                    <Text>{friend.firstName} {friend.lastName}</Text>
                </ImageButton>
            });
            data[Tabs.children] = userChildren.map((child)=>{
                return <ImageButton 
                    key={child._id}
                    right={{src:child?.pfp?.src, aspectRatio:1} || pfp}
                    onPress={()=>navigator(paths.main.child.profile, {childId: child._id})}
                >
                    <Text>{child.firstName} {child.lastName}</Text>
                </ImageButton>
            });
        }
        return data;
    }, [userChildren, userFriends, userEvents]);

    const buttons = (data && data[tab]) || [];

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