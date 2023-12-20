import { ImageButton } from "../../../ottery-ui/buttons/ImageButton";
import { TAB_BUTTON_TYPES } from "../../../ottery-ui/buttons/tabs/TabButton";
import TabField from "../../../ottery-ui/buttons/tabs/TabField";
import { ImageButtonList } from "../../../ottery-ui/containers/ImageButtonList";
import { Main } from "../../../ottery-ui/containers/Main";
import * as React from "react";
import { useEventClient } from "./useEventClient";
import { useUserClient } from "../user/useUserClient";
import { useChildClient } from "../child/useChildClient";
import { Text } from "react-native-paper";
import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";
import { pfp, pluss } from "../../../assets/icons";
import { usePing } from "../../../ottery-ping";
import { colors } from "../../../ottery-ui/styles/colors";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from "../chat/useChatClient";

enum RosterTabs {
    caretakers = "Caretakers",
    attendees = "Attendees",
}

export function Roster({route}) {
    const [tab, setTab] = React.useState(RosterTabs.caretakers);
    const userId = useAuthClient().useUserId();
    const Ping = usePing();
    const navigator = useNavigator();
    const eventId = route.params.eventId; //useAuthClient().useSesh().event;
    const eventClient = useEventClient();
    const eventInfoRes = eventClient.useGetEventInfo({inputs: [eventId]});
    const eventInfo = eventInfoRes?.data?.data;
    console.log(eventInfo);
    const volenteersRes = useUserClient().useGetUserInfo({
        inputs: [eventInfo?.volenteers],
        enabled: !!eventInfo,
    });
    const volenteers = volenteersRes?.data?.data;
    const childrenRes = useChildClient().useGetChildren({
        inputs: [eventInfo?.attendees],
        enabled: !!eventInfo,
    });
    const children = childrenRes?.data?.data;

    const chatIdsRes = useChatClient().useGetDirectChats({
        inputs:[userId, volenteers?.map(v=>v._id)],
        enabled: !!volenteers,
    });
    const chatIdMap = chatIdsRes?.data;

    const buttons = React.useMemo(()=>{
        if (tab === RosterTabs.attendees) {
            const buttons = children?.map((child)=>
                <ImageButton 
                    key={child._id}
                    right={{src:child?.pfp?.src, aspectRatio:1} || pfp}
                    onPress={()=>{Ping.error("go to child info?")}}
                >
                    <Text>{child.firstName} {child.lastName}</Text>
                </ImageButton>
            )

            buttons.unshift(<ImageButton 
                color={colors.success}
                key={"invite attendee"}
                right={pluss}
                onPress={()=>{navigator(paths.main.event.invite.attendee, {eventId: eventId})}}
            >
                <Text>Invite attendee</Text>
            </ImageButton>)

            return buttons
        } else if (tab === RosterTabs.caretakers) {
            const buttons = volenteers?.map((volenteer)=>
                <ImageButton 
                    key={volenteer._id}
                    right={{src:volenteer?.pfp?.src, aspectRatio:1} || pfp}
                    onPress={()=>{
                        if (volenteer._id === userId) {
                            navigator(paths.main.user.profile, {userId:volenteer._id})
                        } else {
                            navigator(paths.main.social.chat, {chatId: chatIdMap[volenteer._id]});
                        }
                    }}
                >
                    <Text>{volenteer.firstName} {volenteer.lastName}</Text>
                </ImageButton>
            ) || [];

            buttons.unshift(<ImageButton 
                color={colors.success}
                key={"add caretaker"}
                right={pluss}
                onPress={()=>{navigator(paths.main.event.invite.caretaker, {eventId: eventId})}}
            >
                <Text>Invite caretaker</Text>
            </ImageButton>)

            return buttons;
        }
    }, [tab, children, volenteers, chatIdsRes]);

    return (
        <Main margins={false} scrollable={false}>
            <TabField
                type={TAB_BUTTON_TYPES.hanging}
                active={tab}
                tabs={Object.values(RosterTabs)}
                onTab={(tab)=>{setTab(tab)}}
            />
            <Main>
                <ImageButtonList>{buttons}</ImageButtonList>
            </Main>
        </Main>
    );
}