import React, { useState } from "react";
import Shadowbox from "../../ottery-ui/containers/Shadowbox";
import Button from "../../ottery-ui/buttons/Button";
import Image from "../../ottery-ui/images/Image";
import TextInput from "../../ottery-ui/input/TextInput";
import PasswordInput from "../../ottery-ui/input/PasswordInput";
import {logoDefault} from "../../assets/images/logos";
import {Main, Form} from "./loginStyles";
import { useDispatch } from 'react-redux'
import paths from "../../router/paths";
import {register} from "./authSlice";
import {isEmail, isPassword} from "ottery-dto"
import { Ping } from "../../ottery-ping/Ping";
import { IGNORENEXT, useNavigator } from "../../hooks/useNavigator";
import Link from "../../ottery-ui/text/Link";
import ImageInput from "../../ottery-ui/input/ImageInput";

export default function Register() {
    const dispatch = useDispatch();
    const navigator = useNavigator();

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [pfp, setPfp] = useState();

    function submit() {
        dispatch(register({
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email,
            pfp: pfp,
        })).then((res)=>{

            if (res.error) {
                Ping.error(res.error.message);
            } else {
                navigator(paths.auth.validate, {next: IGNORENEXT});
            }
        })
    }

    return (
        <Main>
            <Shadowbox>
            <Form>
                    <Image src={logoDefault} alt="logo" width={"100%"}/>
                    <ImageInput 
                        value={pfp}
                        onChange={(e)=>{setPfp(e.target.value)}}
                    />
                    <TextInput
                        label="email"
                        value={email}
                        validator={isEmail}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <TextInput
                        label="first name"
                        value={firstName}
                        state={"default"}
                        onChange={(e)=>{setFirstName(e.target.value)}}
                    />
                    <TextInput
                        label="last name"
                        value={lastName}
                        state={"default"}
                        onChange={(e)=>{setLastName(e.target.value)}}
                    />
                    <PasswordInput
                        label="password"
                        value={password}
                        validator={isPassword}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <Button 
                        onClick={submit} 
                        width="100%" 
                        type="filled"
                    >register</Button>
                </Form>
            </Shadowbox>
            <Shadowbox>
                <div>
                    Have an account? <Link onClick={()=>navigator(paths.auth.login, {next:IGNORENEXT})}>Log in!</Link>
                </div>
            </Shadowbox>
        </Main>
    );
}