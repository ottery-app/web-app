import React, { useState } from "react";
import Shadowbox from "../../ottery-ui/containers/Shadowbox";
import Image from "../../ottery-ui/images/Image";
import TextInput from "../../ottery-ui/input/TextInput";
import PasswordInput from "../../ottery-ui/input/PasswordInput";
import {logoDefault} from "../../assets/images/logos";
import {Main, Form} from "./loginStyles";
import Link from "../../ottery-ui/text/Link";
import paths from "../../router/paths";
import { usePing } from "../../ottery-ping";
import { IGNORENEXT, useNavigator } from "../../hooks/useNavigator";
import { useAuthClient } from "./useAuthClient";
import { AwaitButton } from "../../guards/AwaitButton";

export default function Login() {
    const Ping = usePing();
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
                        label="email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <PasswordInput
                        label="password"
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
                <div>
                    Don't have an account? <Link onClick={()=>navigator(paths.auth.register, {next: IGNORENEXT})}>Sign up!</Link>
                </div>
            </Shadowbox>
        </Main>
    );
}