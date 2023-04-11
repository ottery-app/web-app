import Shadowbox from "../../ottery-ui/containers/Shadowbox";
import Image from "../../ottery-ui/images/Image";
import TextInput from "../../ottery-ui/input/TextInput";
import Button from "../../ottery-ui/buttons/Button";
import OtteryLink from "../../ottery-ui/text/Link";
import {image} from "../../ottery-ui/styles/image";
import React, {useState} from "react";
import {Main, Form} from "./loginStyles";
import {closedMailWithHalo} from "../../assets/images/icons"
import { useDispatch, useSelector } from "react-redux";
import Link from "../../ottery-ui/text/Link";
import paths from "../../router/paths";
import { activate } from "./authSlice";
import { resendEmail } from "./authApi";
import { getUrlVal, makeUrl } from "../../router/navigate";
import { logout } from "./authSlice";
import { Ping } from "../../ottery-ping/Ping";
import { IGNORENEXT, useNavigator } from "../../hooks/useNavigator";

export default function Validate() {
    const dispatch = useDispatch();
    const email = useSelector((store)=>store.auth.sesh.email);
    const [code, setCode] = useState("");
    const state = useSelector(store=>store.auth.sesh.state);
    const navigator = useNavigator();

    function resend() {
        resendEmail().then(()=>{
            Ping.alert("Email resent to " + email);
        }).catch((err)=>{
            Ping.error(err.message);
        });
    }

    function submit() {
        dispatch(activate({
            code: code.toUpperCase(),
        })).then((res)=>{
            if (res.error) {
                Ping.error(res.error.message);
            }

            if (!res.error) {
                navigator(paths[state].home);
            }
        });
    }

    return (
        <Main>
            <Shadowbox>
                <Form>
                    <Image src={closedMailWithHalo} alt="mail" width={image.largeProfile}/>
                    <h4>
                        Enter confirmation code
                    </h4>
                    <div>
                        We sent it to:
                    </div>
                    <div>
                        {email}
                    </div>

                    <OtteryLink onClick={resend}>
                        Resend it?
                    </OtteryLink>

                    <TextInput 
                        type = "text"
                        value={code}
                        onChange={(e)=>{setCode(e.target.value)}}
                        label="Activation Code"
                    />
                    <Button
                        onClick={submit} 
                        width="100%" 
                        type="filled"
                    >Activate</Button>
                </Form>
            </Shadowbox>
            <Shadowbox>
                <div>
                    Have an account? <Link onClick={()=>{
                        dispatch(logout());
                        navigator(paths.auth.login, {next:IGNORENEXT});
                    }}>Log in!</Link>
                </div>
            </Shadowbox>
        </Main>
    );
}