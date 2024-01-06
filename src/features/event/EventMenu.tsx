import { ButtonMenu } from "../../../ottery-ui/containers/ButtonMenu";
import { Main } from "../../../ottery-ui/containers/Main";
import { clock, info, message, users } from "../../../assets/icons";
import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";
import { useEventClient } from "./useEventClient";
import { Text } from "react-native-paper";
import { margin } from "../../../ottery-ui/styles/margin";
import { useChatClient } from "../chat/useChatClient";
import { useAuthClient } from "../auth/useAuthClient";
import { role } from "@ottery/ottery-dto";
import {useMemo} from "react"
import { usePing } from "../../../ottery-ping";

export function EventMenu({route}) {
    const navigator = useNavigator();
    const Ping = usePing();

    const userId = useAuthClient().useUserId();
    const [state, swapState] = useAuthClient().useSwapState()

    const eventClient = useEventClient();
    const eventId = route.params.eventId;
    const eventRes = eventClient.useGetEvent({inputs:[eventId]});
    const event = eventRes?.data?.data;

    const chatIdRes = useChatClient().useGetDirectChat({
        inputs:[userId, event?.leadManager],
        enabled: !!event,
    });
    const chat = chatIdRes?.data?.data;
    const isLeadManager = useMemo(()=>event?.leadManager === userId || false, [eventRes]);
    const isManager = useMemo(()=>event?.managers?.includes(userId) || false, [eventRes]);
    const isVolenteer = useMemo(()=>event?.volenteers?.includes(userId) || false, [eventRes]);
    const isAtendee = useMemo(()=>event?.attendees?.includes(userId) || false, [eventRes]);

    const buttons = useMemo(()=>{
        const buttons = [
            {
                icon: { uri: info.src },
                title: "Info",
                onPress: () => {
                    navigator(paths.main.event.home, {eventId: eventId});
                },
            },
            // {
            //     icon: { uri: share.src },
            //     title: "Copy signup link",
            //     onPress: () => {
            //         setClipboard(`${window.location.origin}/${paths.main.event.signup}?eventId=${eventId}`);
            //         Ping.success("coppied to clipboard");
            //     },
            // },
        ];

        if (isVolenteer) {
            buttons.push(
                {
                    icon: { uri: clock.src },
                    title: (state===role.GUARDIAN)?"Clock in":"Clock out",
                    onPress: () => {
                        swapState(event._id);
                    },
                },
                {
                    icon: { uri: users.src },
                    title: "Roster",
                    onPress: () => {
                        navigator(paths.main.event.roster, {eventId: event._id});
                    },
                },
                // {
                //     icon: { uri: pfp.src },
                //     title: "New Attendee",
                //     onPress: () => {
                //         navigator(paths.main.event.invite.attendee, {eventId: event._id});
                //     },
                // }
            )
        }

        if (isAtendee) {

        }

        if (isManager) {

        }

        if (isLeadManager) {

        } else {
            buttons.push(
                {
                    icon: { uri: message.src },
                    title: "Questions?",
                    onPress: () => {
                        navigator(paths.main.social.chat, {chatId: chat._id})
                    },
                },
            )
        }

        return buttons
    }, [isLeadManager, isManager, isVolenteer, isAtendee, chatIdRes]);

    return(
        <Main>
            <Text variant="titleLarge" style={{paddingBottom:margin.small}}>{event?.summary}</Text>
            <ButtonMenu buttons={buttons} />
        </Main>
    );
}