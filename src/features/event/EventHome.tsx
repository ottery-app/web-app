import { ButtonMenu } from "../../../ottery-ui/containers/ButtonMenu";
import { Main } from "../../../ottery-ui/containers/Main";
import { message, share, userPlus } from "../../../assets/icons";
import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";
import { useEventClient } from "./useEventClient";
import { Text } from "react-native-paper";
import { margin } from "../../../ottery-ui/styles/margin";
import { useChatClient } from "../chat/useChatClient";
import { useAuthClient } from "../auth/useAuthClient";
import { EventDto, role } from "@ottery/ottery-dto";
import {useMemo} from "react"
import { RRule } from "rrule";
import { DateFormat, Time } from "../../../ottery-ui/text/Time";
import { View } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { usePing } from "../../../ottery-ping";
import { IconHeader } from "../../../ottery-ui/headers/IconHeader";
import { Header } from "../../../ottery-ui/headers/Header";

export function EventHome({route}) {
    const Ping = usePing();
    const navigator = useNavigator()

    const userId = useAuthClient().useUserId();

    const eventId = route.params.eventId;
    const eventRes = useEventClient().useGetEventInfo({inputs:[eventId]});
    const event = eventRes?.data?.data as EventDto;

    const chatIdRes = useChatClient().useGetDirectChat({
        inputs:[userId, event?.leadManager],
        enabled: !!event && !!event?.leadManager,
    });
    const chat = chatIdRes?.data?.data;

    const isLeadManager = useMemo(()=>event?.leadManager === userId, [eventRes]);

    const buttons = useMemo(()=>{
        const buttons = [
            {
                icon: { uri: userPlus.src },
                title: "Signup",
                onPress: () => {
                    navigator(paths.main.event.signup, {eventId});
                },
            },
            {
                icon: { uri: share.src },
                title: "Share", 
                onPress: ()=>{
                    //ADD SHARE TOOOOOOO LATER
                    Clipboard.setStringAsync(`${window.location.origin}/${paths.main.event.home}?eventId=${eventId}`)
                        .then(() => {
                            Ping.success("Copied link to clipboard");
                        })
                        .catch(error => {
                            Ping.error("We had an issue making the link");
                        });
                }
            }
        ];

        if (!isLeadManager) {
            buttons.push(
                {
                    icon: { uri: message.src },
                    title: "Questions?",
                    onPress: () => {
                        navigator(paths.main.social.chat, {chatId: chat?._id})
                    },
                },
            )
        }

        return buttons;
    }, [chatIdRes, eventRes]);

    return (
        <Main margins={false}>
                <Header
                    title={event?.summary}
                />
                <Main scrollable={true} style={{gap:margin.medium, justifyContent:"left"}}>
                    <ButtonMenu buttons={buttons} />
                    <Text>{event?.description}</Text>
                </Main>
        </Main>
    );
}

function DisplayTimeInfo({event}) {
    const rrule = useMemo(()=>RRule.fromString('FREQ=WEEKLY;COUNT=5;BYDAY=MO,TH'), [event]);

    const last = useMemo(()=>{
        if (event) {
            rrule.options.dtstart = new Date(event?.start);
            return rrule?.all().pop().getTime();
        } else {
            return 0;
        }
    }, [event]);

    // if (rrule.options.freq === RRule.WEEKLY) {
    //     const byDayValue = rrule.options.byweekday;

    //     // Map the BYDAY value to abbreviated day names
    //     var daysOfWeekAbbreviated = byDayValue.map(dayIndex => {
    //         const daysAbbreviated = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    //         return daysAbbreviated[dayIndex];
    //     });
    // }

    if (event) {
        return <View style={{flexDirection:"column"}}>
            {/* {(rrule.options.freq === RRule.WEEKLY)
                ? <Text >{daysOfWeekAbbreviated.join(", ")}</Text> 
                : undefined
            } */}
            {(new Date(last).getDay() === new Date(event?.start).getDay())
                ? <Time time={event?.start || 0} type={DateFormat.mdy}/>
                : <View style={{flexDirection:"row"}}>
                    <Time time={event?.start || 0} type={DateFormat.mdy}/>
                    <Text>{" - "}</Text>
                    <Time time={last || 0} type={DateFormat.mdy}/>   
                </View>
            }
            <View style={{flexDirection:"row"}}>
                <Time time={event?.start} type={DateFormat.time}/>
                <Text>{" - "}</Text>
                <Time time={event?.start + event?.durration} type={DateFormat.time}/>
            </View>
        </View>
    } else {
        return <></>
    }
}