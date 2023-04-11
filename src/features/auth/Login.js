import React, { useState } from "react";
import Shadowbox from "../../ottery-ui/containers/Shadowbox";
import Button from "../../ottery-ui/buttons/Button";
import Image from "../../ottery-ui/images/Image";
import TextInput from "../../ottery-ui/input/TextInput";
import PasswordInput from "../../ottery-ui/input/PasswordInput";
import {logoDefault} from "../../assets/images/logos";
import {Main, Form} from "./loginStyles";
import Link from "../../ottery-ui/text/Link";
import { useDispatch, useSelector } from 'react-redux'
import paths from "../../router/paths";
import {login} from "./authSlice";
import { Ping } from "../../ottery-ping/Ping";
import { IGNORENEXT, useNavigator } from "../../hooks/useNavigator";
import useSwapState from "../../hooks/useSwapState";

export default function Login() {
    const navigator = useNavigator();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submit() {
        dispatch(login({
            email: email,
            password: password,
        })).then((res)=>{
            if (res.error) {
                Ping.error(res.error.message);
            }

            if (!res.error) {
                navigator(paths[res.payload.state].home);
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
                    <Button
                        onClick={submit} 
                        width="100%" 
                        type="filled"
                    >login</Button>
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