import { ButtonMenu } from "../../../ottery-ui/containers/ButtonMenu";
import { Main } from "../../../ottery-ui/containers/Main";
import { clock, message, users } from "../../../assets/icons";
import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";
import { useEventClient } from "./useEventClient";
import { Text } from "react-native-paper";
import { margin } from "../../../ottery-ui/styles/margin";
import { useChatClient } from "../chat/useChatClient";
import { useAuthClient } from "../auth/useAuthClient";
import { role } from "@ottery/ottery-dto";
import {useMemo} from "react"

export function EventHome({route}) {
    const navigator = useNavigator();
    const userId = useAuthClient().useUserId();
    const [state, swapState] = useAuthClient().useSwapState()

    const eventClient = useEventClient();
    const eventId = route.params.eventId;
    const eventRes = eventClient.useGetEvent({inputs:[eventId]});
    const event = eventRes?.data?.data;

    const chatIdRes = useChatClient().useGetDirectChat({
        inputs:[userId, event?.managers[0]],
        enabled: !!event,
    });
    const chat = chatIdRes?.data?.data;
    const isVolenteer = useMemo(()=>event?.volenteers.includes(userId), [eventRes]);
    const isAtendee = useMemo(()=>event?.attendees.includes(userId), [eventRes]);

    const buttons = useMemo(()=>{
        const buttons = [
            {
                icon: { uri: message.src },
                title: "Questions?",
                onPress: () => {
                    navigator(paths.main.social.chat, {chatId: chat._id})
                },
            }
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

                    },
                }
            )
        } else {

        }

        if (isAtendee) {

        } else {

        }

        return buttons
    }, [isVolenteer, isAtendee, chatIdRes]);

    console.log(isVolenteer, isAtendee);

    return(
        <Main>
            <Text variant="titleLarge" style={{paddingBottom:margin.small}}>{event?.summary}</Text>
            <ButtonMenu buttons={buttons} />
        </Main>
    );
}