import React, { useState } from "react";
import {Shadowbox} from "../../ottery-ui-new/containers/Shadowbox";
import {Image} from "../../ottery-ui-new/images/Image";
import {TextInput} from "../../ottery-ui-new/input/TextInput";
import {PasswordInput} from "../../ottery-ui-new/input/PasswordInput";
import {logoDefault} from "../../assets/images/logos";
import {Main, Form} from "./loginStyles";
import {Link} from "../../ottery-ui-new/text/Link";
import paths from "../../router/paths";
import { Ping } from "../../ottery-ping/Ping";
import { IGNORENEXT, useNavigator } from "../../hooks/useNavigator";
import { useAuthClient } from "./useAuthClient";
import { AwaitButton } from "../../guards/AwaitButton";
import { Text } from "../../ottery-ui-new/text/Text";

export default function Login() {
    const navigator = useNavigator();
    const {useLogin} = useAuthClient();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useLogin();

    function submit() {
        login.mutate({
            email,
            password
        }, {
            onSuccess: (data)=>{
                if (data.error) {
                    Ping.error("Invalid username or password");
                }

                if (data.payload && !data.error) {
                    navigator(paths[data.payload.state].home);
                }
            }
        });
    }

    return (
        <Main>
            <Shadowbox>
                <Form>
                    <Image src={logoDefault} alt="logo" width={"100%"}/>
                    <TextInput
                        label="Email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <PasswordInput
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <AwaitButton
                        onClick={submit} 
                        width="100%" 
                        type="filled"
                        status={login.status}
                    >login</AwaitButton>
                </Form>
            </Shadowbox>
            <Shadowbox>
                <Text>
                    Don't have an account? <Link onClick={()=>navigator(paths.auth.register, {next: IGNORENEXT})}>Sign up!</Link>
                </Text>
            </Shadowbox>
        </Main>
    );
}