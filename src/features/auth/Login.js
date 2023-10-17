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
                    throw data.error;
                }

                if (data.payload && !data.error) {
                    navigator(paths.main.home);
                }
            }
        });
    }

    return (
        <Main>
            <Shadowbox>
                <Form>
                    <Image src={logoDefault} alt="logo" width={"100%"} />
                    <TextInput
                        label="Email"
                        value={email}
                        status={login.status}
                        onChange={(text)=>{setEmail(text)}}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        status={login.status}
                        onChange={(text)=>{setPassword(text)}}
                    />
                    <AwaitButton
                        onPress={submit} 
                        width="100%" 
                        type="filled"
                        status={login.status}
                    >Login</AwaitButton>
                </Form>
            </Shadowbox>
            <Shadowbox>
                <TextField>
                    <Text>Don't have an account?</Text>
                    <Link onPress={()=>navigator(paths.auth.register)}>Sign up!</Link>
                </TextField>
            </Shadowbox>
        </Main>
    );
}