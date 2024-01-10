import { Main, Form } from "./loginStyles";
import Shadowbox from "../../../ottery-ui/containers/Shadowbox";
import { AwaitButton } from "../../guards/AwaitButton";
import { useNavigator } from "../../router/useNavigator";
import { usePing } from "../../../ottery-ping";
import { useAuthClient } from "./useAuthClient";
import { useState } from "react";
import TextInput from "../../../ottery-ui/input/TextInput";
import { Link } from "../../../ottery-ui/text/Link";
import { logoDefault } from "../../../assets/logos";
import Image from "../../../ottery-ui/image/Image";
import paths from "../../router/paths";
import { Text } from "react-native-paper";

export default function Login() {
  const Ping = usePing();
  const navigator = useNavigator();
  const { useLogin } = useAuthClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  function navigateForgotPassword() {
    navigator(paths.auth.forgotPassword, undefined, {ignoreNext:true});
  }

  function submit() {
    login.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          if (data.error) {
            Ping.error("Invalid username or password");
            throw data.error;
          }

          if (data.payload && !data.error) {
            navigator(paths.auth.validate, undefined, {ignoreNext:true});
          }
        },
      }
    );
  }

  return (
    <Main>
      <Shadowbox>
        <Image src={logoDefault} alt="logo" width={"100%"} />
        <Form>
          <TextInput
            label="Email"
            value={email}
            status={login.status}
            onChange={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            label="Password"
            value={password}
            status={login.status}
            onChange={(text) => {
              setPassword(text);
            }}
            password
          />
          <AwaitButton onPress={submit} width="100%" status={login.status}>
            Login
          </AwaitButton>
          <Link onPress={navigateForgotPassword}>Forgot Password</Link>
        </Form>
      </Shadowbox>
      <Shadowbox>
        <Text>
          Don't have an account?{" "}
          <Link onPress={() => navigator(paths.auth.register, undefined, {ignoreNext:true})}>Sign up!</Link>
        </Text>
      </Shadowbox>
    </Main>
  );
}
