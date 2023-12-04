import { Text } from "react-native-paper";
import { Main } from "../../../ottery-ui/containers/Main";
import TextInput from "../../../ottery-ui/input/TextInput";
import { useState } from "react";
import { isEmail } from "@ottery/ottery-dto";
import { QRCode } from "../../../ottery-ui/image/QRCode";
import paths from "../../router/paths";
import { image } from "../../../ottery-ui/styles/image";
import { ButtonSpan } from "../../../ottery-ui/containers/ButtonSpan";
import Button from "../../../ottery-ui/buttons/Button";
import { usePing } from "../../../ottery-ping";
import { margin } from "../../../ottery-ui/styles/margin";
import { View } from "react-native";
import { radius } from "../../../ottery-ui/styles/radius";
import { colors } from "../../../ottery-ui/styles/colors";
import { border } from "../../../ottery-ui/styles/border";

export function InviteAttendee({route}) {
    const Ping = usePing();
    const [email, setEmail] = useState("");

    function sendInvite() {
        Ping.error("Not implemented");
    }

    return (
        <Main style={{
            flex:1,
            gap:margin.large,
            alignItems:"center",
            justifyContent:"center",
        }}>
            <Text variant="headlineLarge">Scan to signup</Text>
            <View 
                style={{
                    borderRadius: radius.round,
                    borderColor: colors.tertiary.dark,
                    borderWidth: border.thick,
                    padding: margin.large,
                    backgroundColor: colors.tertiary.main,
                }}
            >
                <QRCode
                    value={`${paths.main.event.invite.attendee}?eventId=${route.params.eventId}`}
                    size={image.largeProfile}
                />
            </View>
            <Text variant="headlineLarge">Or email signup</Text>
            <TextInput value={email} onChange={setEmail} label="Email" validator={isEmail} />
            <ButtonSpan>
                <Button onPress={sendInvite}>
                    Send invite
                </Button>
            </ButtonSpan>
        </Main>
    );
}