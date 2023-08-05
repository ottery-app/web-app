import {Shadowbox} from "../../ottery-ui-new/containers/Shadowbox";
import {Image} from "../../ottery-ui-new/images/Image";
import {TextInput} from "../../ottery-ui-new/input/TextInput";
import {image} from "../../ottery-ui/styles/image";
import React, {useState} from "react";
import {Main, Form} from "./loginStyles";
import {closedMailWithHalo} from "../../assets/images/icons"
import {Link} from "../../ottery-ui-new/text/Link";
import paths from "../../router/paths";
import { Ping } from "../../ottery-ping/Ping";
import { IGNORENEXT, useNavigator } from "../../hooks/useNavigator";
import {useAuthClient} from "./useAuthClient";
import {AwaitButton} from "../../guards/AwaitButton";
import { Title } from "../../ottery-ui-new/text/Title";
import { Text } from "../../ottery-ui-new/text/Text";

export default function Validate() {
    const [code, setCode] = useState("");
    const navigator = useNavigator();
    const {useResendEmail, useActivate, useLogout, useUserEmail, useUserState} = useAuthClient();
    const state = useUserState();
    const email = useUserEmail();
    const resendEmail = useResendEmail();
    const activate = useActivate();
    const logout = useLogout();

    function resend() {
        resendEmail.mutate(undefined, {
            onSuccess: ()=>{
                Ping.alert("Email sent to " + email);
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
                }
    
                if (!res.error) {
                    navigator(paths[state].home);
                }
            }
        });
    }

    function logoutAction() {
        logout.mutate(undefined, {
            onSuccess: ()=>{
                navigator(paths.auth.login, {next:IGNORENEXT});
            }
        })
    }

    return (
        <Main>
            <Shadowbox>
                <Form>
                    <Image src={closedMailWithHalo} alt="mail" width={image.largeProfile}/>
                    <Title h="h4">
                        Enter confirmation code
                    </Title>
                    <Text>
                        We sent it to:
                    </Text>
                    <Text>
                        {email}
                    </Text>

                    <Link onClick={resend}>
                        Resend it?
                    </Link>

                    <TextInput 
                        type = "text"
                        value={code}
                        onChange={(e)=>{setCode(e.target.value)}}
                        label="Activation Code"
                    />
                    <AwaitButton
                        onClick={submit} 
                        width="100%" 
                        type="filled"
                        status={activate.status}
                    >Activate</AwaitButton>
                </Form>
            </Shadowbox>
            <Shadowbox>
                <Text>
                    Have an account? <Link onClick={logoutAction}>Log in!</Link>
                </Text>
            </Shadowbox>
        </Main>
    );
}