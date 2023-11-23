import { Main } from "../../../ottery-ui/containers/Main";
import {useState} from "react";
import { Text } from "react-native-paper";
import { useEventClient } from "./useEventClient";
import TextInput from "../../../ottery-ui/input/TextInput";
import { isEmail } from "@ottery/ottery-dto";
import {View} from "react-native";
import { margin } from "../../../ottery-ui/styles/margin";
import Button from "../../../ottery-ui/buttons/Button";
import { ButtonSpan } from "../../../ottery-ui/containers/ButtonSpan";
import { sendCaretakerInvite } from "./eventApi";
import { usePing } from "../../../ottery-ping";

export function InviteCaretaker({route}) {
    const [email, setEmail] = useState("");
    const Ping = usePing();
    const eventRes = useEventClient().useGetEventInfo({inputs:[route.params.eventId]});
    const event = eventRes?.data?.data;

    function sendInvite() {
        sendCaretakerInvite(route.params.eventId, email).then((res)=>{
            Ping.success("Invite sent");
        }).catch((e)=>{
            Ping.error(e.message);
        });
    }
    
    return (
        <Main>
            <View style={{
                flex:1,
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                gap: margin.large,
                marginTop: margin.large,
                paddingTop: margin.large,
            }}>
                <Text variant="titleMedium">You are inviting a caretaker for:</Text>
                <Text variant="headlineSmall">{event?.summary}</Text>
                <Text variant="titleMedium">Enter their email here:</Text>
                <TextInput
                    label={"email"}
                    value={email}
                    onChange={(email)=>setEmail(email)}
                    validator={isEmail}
                />
                <ButtonSpan>
                    <Button onPress={sendInvite}>Send invite</Button>
                </ButtonSpan>
            </View>
        </Main>
    );
}