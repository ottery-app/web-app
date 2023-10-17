import { Main, Form } from "./loginStyles";
import Shadowbox from "../../../ottery-ui/containers/Shadowbox";
import { AwaitButton } from "../../guards/AwaitButton";
import { useNavigator } from "../../router/useNavigator";
import { usePing } from "../../../ottery-ping";
import { useAuthClient } from "./useAuthClient";
import {useState} from "react";
import TextInput from "../../../ottery-ui/input/TextInput";
import { Link } from "../../../ottery-ui/text/Link";
import { Text } from "../../../ottery-ui/text/Text";
import { TextField } from "../../../ottery-ui/text/TextField";
import { logoDefault } from "../../../assets/logos";
import Image from "../../../ottery-ui/image/Image";
import paths from "../../router/paths";
import { isPassword } from "@ottery/ottery-dto";
import { isEmail } from "@ottery/ottery-dto";

export default function Register() {
    const Ping = usePing();
    const navigator = useNavigator();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const {useRegister} = useAuthClient();
    const register = useRegister();

    function submit() {
        register.mutate({
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email,
        }, {
            onSuccess: (res)=>{
                if (res.error) {
                    Ping.error(res.error.message);
                    throw res.error;
                } else {
                    navigator(paths.auth.validate);
                }
            }
        })
    }

    return (
        <Main>
            <Shadowbox>
                <Form>
                    <Image src={logoDefault} alt="logo" width={"100%"}/>
                    <TextInput
                        label="First name"
                        value={firstName}
                        state={"default"}
                        onChange={(text)=>{setFirstName(text)}}
                    />
                    <TextInput
                        label="Fast name"
                        value={lastName}
                        state={"default"}
                        onChange={(text)=>{setLastName(text)}}
                    />
                    <TextInput
                        label="Email"
                        value={email}
                        validator={isEmail}
                        onChange={(text)=>{setEmail(text)}}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        validator={isPassword}
                        onChange={(text)=>{setPassword(text)}}
                        password
                    />
                    <AwaitButton 
                        onClick={submit} 
                        width="100%" 
                        type="filled"
                        status={register.status}
                    >Register</AwaitButton>
                </Form>
            </Shadowbox>
            <Shadowbox>
                <TextField>
                    <Text>Have an account?</Text>
                    <Link onPress={()=>navigator(paths.auth.login)}>Log in!</Link>
                </TextField>
            </Shadowbox>
        </Main>
    );
}