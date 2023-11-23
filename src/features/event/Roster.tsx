import { ImageButton } from "../../../ottery-ui/buttons/ImageButton";
import { TAB_BUTTON_TYPES } from "../../../ottery-ui/buttons/tabs/TabButton";
import TabField from "../../../ottery-ui/buttons/tabs/TabField";
import { ImageButtonList } from "../../../ottery-ui/containers/ImageButtonList";
import { Main } from "../../../ottery-ui/containers/Main";
import * as React from "react";
import { useAuthClient } from "../auth/useAuthClient";
import { useEventClient } from "./useEventClient";
import { useUserClient } from "../user/useUserClient";
import { useChildClient } from "../child/useChildClient";
import { Text } from "react-native-paper";
import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";
import { pfp, pluss } from "../../../assets/icons";
import { usePing } from "../../../ottery-ping";
import { colors } from "../../../ottery-ui/styles/colors";

enum RosterTabs {
    caretakers = "Caretakers",
    attendees = "Attendees",
}

export function Roster() {
    const [tab, setTab] = React.useState(RosterTabs.caretakers);
    const Ping = usePing();
    const navigator = useNavigator();
    const eventId = useAuthClient().useSesh().event;
    const eventClient = useEventClient();
    const eventInfoRes = eventClient.useGetEventInfo({inputs: [eventId]});
    const eventInfo = eventInfoRes?.data?.data;
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

    const buttons = React.useMemo(()=>{
        if (tab === RosterTabs.attendees) {
            return children?.map((child)=>
                <ImageButton 
                    key={child._id}
                    right={{src:child?.pfp?.src, aspectRatio:1} || pfp}
                    onPress={()=>{Ping.error("go to child info?")}}
                >
                    <Text>{child.firstName} {child.lastName}</Text>
                </ImageButton>
            )
        } else if (tab === RosterTabs.caretakers) {
            const buttons = volenteers?.map((volenteer)=>
                <ImageButton 
                    key={volenteer._id}
                    right={{src:volenteer?.pfp?.src, aspectRatio:1} || pfp}
                    onPress={()=>{Ping.error("go to volenteer info?")}}
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
    }, [tab, children, volenteers]);

    return (
        <>
        <TabField
            type={TAB_BUTTON_TYPES.hanging}
            active={tab}
            tabs={Object.values(RosterTabs)}
            onTab={(tab)=>{setTab(tab)}}
        />
        <Main>
            <ImageButtonList>{buttons}</ImageButtonList>
        </Main>
        </>
    );
}