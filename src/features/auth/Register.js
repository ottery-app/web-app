import React, { useState } from "react";
import {Shadowbox} from "../../ottery-ui-new/containers/Shadowbox";
//import {Image} from "../../ottery-ui-new/images/Image";
import {TextInput} from "../../ottery-ui-new/input/TextInput";
import {PasswordInput} from "../../ottery-ui-new/input/PasswordInput";
//import {logoDefault} from "../../assets/images/logos";
import {Main, Form} from "./loginStyles";
import paths from "../../router/paths";
import {isEmail, isPassword} from "ottery-dto"
import { Ping } from "../../ottery-ping/Ping";
import { IGNORENEXT, useNavigator } from "../../hooks/useNavigator";
import {Link} from "../../ottery-ui-new/text/Link";
import {ImageInput} from "../../ottery-ui-new/input/ImageInput";
import {AwaitButton} from "../../guards/AwaitButton";
import { useAuthClient } from "./useAuthClient";

export default function Register() {
    const navigator = useNavigator();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [pfp, setPfp] = useState();
    const {useRegister} = useAuthClient();
    const register = useRegister();

    function submit() {
        register.mutate({
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email,
            pfp: pfp,
        }, {
            onSuccess: (res)=>{
                if (res.error) {
                    Ping.error(res.error.message);
                } else {
                    navigator(paths.auth.validate, {next: IGNORENEXT});
                }
            }
        })
    }

    return (
        <Main>
            <Shadowbox>
                <Form>
                    {/* <Image src={logoDefault} alt="logo" width={"100%"}/> */}
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
                        value={password}
                        validator={isPassword}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                    <AwaitButton 
                        onClick={submit} 
                        width="100%" 
                        type="filled"
                        status={register.status}
                    >register</AwaitButton>
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