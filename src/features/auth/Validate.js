import Shadowbox from "../../../ottery-ui/containers/Shadowbox";
import { Main } from "./loginStyles";
import { Text } from "react-native-paper";
import Image from "../../../ottery-ui/image/Image";
import {closedMailWithHalo} from "../../../assets/icons"
import { Link } from "../../../ottery-ui/text/Link";
import { useAuthClient } from "./useAuthClient";
import { useState } from "react";
import { usePing } from "../../../ottery-ping";
import { View } from "react-native";
import { margin } from "../../../ottery-ui/styles/margin";
import TextInput from "../../../ottery-ui/input/TextInput";
import { AwaitButton } from "../../guards/AwaitButton";

export default function Validate() {
    const Ping = usePing();
    const [code, setCode] = useState("");

    const {useResendEmail, useActivate, useUserEmail} = useAuthClient();
    const email = useUserEmail();
    const resendEmail = useResendEmail();
    const activate = useActivate();


    function resend() {
        resendEmail.mutate(undefined, {
            onSuccess: ()=>{
                Ping.info("Email sent to " + email);
            },
            onError: (err)=>{
                Ping.error(err.message);
            },
        });
    }

    function submit() {
        activate.mutate({
            code: code.toUpperCase(),
        }, {
            onSuccess: (res)=>{
                if (res.error) {
                    Ping.error(res.error.message);
                    throw res.error
                }
            }
        });
    }

    return (
        <Main>
            <Shadowbox>
                <Image src={closedMailWithHalo} alt="email icon" maxWidth={200} width={"100%"} />
                <View style={{
                    flex:1,
                    alignItems:"center",
                    justifyContent:"center",
                    gap: margin.small,
                    padding:  margin.medium,
                }}>
                    <Text variant="titleLarge">Enter confirmation code</Text>
                    <Text variant="titleMedium">We sent it to:</Text>
                    <Text variant="titleMedium">{email}</Text>
                    <Link variant="titleMedium" onPress={resend}>Resend it?</Link>

                    <TextInput
                        value={code}
                        onChange={(text)=>{setCode(text)}}
                        label="Activation code"
                    />
                    <AwaitButton
                        onPress={submit}
                        status={activate.status}
                    >Activate</AwaitButton>
                </View>
            </Shadowbox>
        </Main>  
    );
}