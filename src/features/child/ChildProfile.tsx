import { MultiFieldHeader } from "../../../ottery-ui/headers/MultiFieldHeader";
import { useMemo, useState } from "react";
import { ImageButton } from "../../../ottery-ui/buttons/ImageButton";
import { ImageButtonList } from "../../../ottery-ui/containers/ImageButtonList";
import { pfp, pluss } from "../../../assets/icons";
import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";
import { useChildClient } from "./useChildClient";
import { useUserClient } from "../user/useUserClient";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from "../chat/useChatClient";
import { colors } from "../../../ottery-ui/styles/colors";
import { Text } from "react-native-paper";
import { useEventClient } from "../event/useEventClient";
import React from "react";
import { Main } from "../../../ottery-ui/containers/Main";

enum Tabs {
    events = "Events",
    guardians = "Guardians", 
}

export function ChildProfile({route}) {
    const navigator = useNavigator();

    const userId = useAuthClient().useUserId();
    const childId = route.params.childId;
    const childRes = useChildClient().useGetChild({inputs:[childId]});
    const childData = childRes?.data?.data;
    const childEventsIds = childData?.events;
    const childGuardiansRes = useUserClient().useGetUserInfo({
        inputs:[childData?.guardians],
        enabled: !!childData?.guardians,
    });
    const childGuardians = childGuardiansRes?.data?.data.filter((guardian)=>guardian._id !== userId);
    const childGuardianIds = childGuardians?.map(guardian=>guardian._id);
    const chatIdsRes = useChatClient().useGetDirectChats({
        inputs:[userId, childGuardianIds],
        enabled: !!childGuardians,
    });
    const childEventsRes = useEventClient().useGetEvents({
        inputs: [childEventsIds],
        enabled: !!childEventsIds,
    })
    const childEvents = childEventsRes?.data?.data;
    const chatIdMap = chatIdsRes?.data;


    const [tab, setTab] = useState(Tabs.events);
    const data = useMemo(()=>{
        if (childEvents && childGuardians) {
            var data = {};
            data[Tabs.events] = childEvents;
            data[Tabs.guardians] = childGuardians;
        }
        return data;
    }, [childEvents, childGuardians]);

    const buttons = useMemo(()=>data && data[tab]?.map((data)=>{
        const props = {
            key: data._id,
        }

        const image = {src:data?.pfp?.src, aspectRatio:1} || pfp;

        if (tab === Tabs.guardians) {
            return <ImageButton 
                {...props}
                right={image}
                onPress={()=>navigator(paths.main.social.chat, {chatId: chatIdMap[data._id]})}
            >
                <Text>{data.firstName} {data.lastName}</Text>
            </ImageButton>
        } else if (tab === Tabs.events) {
            return <ImageButton 
                {...props}
                onPress={()=>navigator(paths.main.event.dash, {eventId: data._id})}
            >
                <Text>{data.summary}</Text>
            </ImageButton>
        }
    }) || [], [data, tab, chatIdMap]);

    return (
        <Main margins={false} scrollable={false}>
            <MultiFieldHeader
                src={childData?.pfp}
                title={childData?.firstName + " " + childData?.lastName}
                tab={tab}
                onTab={(tab)=>{setTab(tab)}}
                tabs={Object.values(Tabs)}
            />
            <ImageButtonList>
                {(tab===Tabs.guardians)
                    ? <ImageButton 
                        color={colors.success} 
                        right={pluss}
                        onPress={()=>{navigator(paths.main.child.addGuardian, {childId: childId})}}
                    >
                        <Text>Add guardian</Text>
                    </ImageButton>
                    : undefined
                }
                {buttons}
            </ImageButtonList>
        </Main>
    );
}