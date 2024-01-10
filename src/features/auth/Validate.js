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
import { isActivationCode } from "@ottery/ottery-dto";
import { useGotoNext, useNavigator } from "../../router/useNavigator";

export default function Validate() {
    const Ping = usePing();
    const [code, setCode] = useState("");

    const gotoNext = useGotoNext();
    const {useResendEmail, useActivate, useUserEmail} = useAuthClient();
    const email = useUserEmail();
    const resendEmail = useResendEmail();
    const activate = useActivate();


    function resend() {
        resendEmail.mutate(undefined, {
            onSuccess: ()=>{
                Ping.success("Email sent to " + email);
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
                    Ping.error("Incorrect code");
                } else {
                    gotoNext();
                }
            },
        });
    }

    return (
        <Main>
            <Shadowbox>
                <View style={{
                    justifyContent:"center",
                    alignItems:"center",
                    gap: margin.medium,
                }}>
                    <Image src={closedMailWithHalo} alt="email icon" width={200} height={200}/>
                    <View style={{
                        justifyContent:"center",
                        alignItems:"center",
                    }}>
                        <Text variant="titleLarge">Enter confirmation code</Text>
                        <Text variant="titleMedium">We sent it to:</Text>
                        <Text variant="titleMedium">{email}</Text>
                        <Link variant="titleMedium" onPress={resend}>Resend it?</Link>
                    </View>
                    <View style={{
                        justifyContent:"center",
                        alignItems:"center",
                        gap: margin.small,
                    }}>
                        <TextInput
                            value={code}
                            onChange={(text)=>{setCode(text)}}
                            validator={isActivationCode}
                            label="Activation code"
                        />
                        <AwaitButton
                            onPress={submit}
                            status={activate.status}
                        >Activate</AwaitButton>
                    </View>
                </View>
            </Shadowbox>
        </Main>  
    );
}