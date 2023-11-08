import { useState } from "react";
import { Text } from "react-native-paper";

import Shadowbox from "../../../ottery-ui/containers/Shadowbox";
import { Form, Main } from "./loginStyles";
import Image from "../../../ottery-ui/image/Image";
import { logoDefault } from "../../../assets/logos";
import TextInput from "../../../ottery-ui/input/TextInput";
import { AwaitButton } from "../../guards/AwaitButton";
import { usePing } from "../../../ottery-ping";
import { useNavigator } from "../../router/useNavigator";
import { useAuthClient } from "./useAuthClient";
import { ResetPasswordDto } from "@ottery/ottery-dto";
import paths from "../../router/paths";

function ResetPasswordScreen({ route }) {
  const { email, token } = route.params;
  const Ping = usePing();
  const navigator = useNavigator();
  const [password, setPassword] = useState("");
  const { useResetPassword } = useAuthClient();
  const resetPassword = useResetPassword();

  function handlePasswordChange(text: string) {
    setPassword(text);
  }

  function navigateToLogin() {
    navigator(paths.auth.login);
  }

  function handleResetPassword() {
    const resetPasswordDto: ResetPasswordDto = {
      email,
      token,
      password,
    };

    resetPassword.mutate(resetPasswordDto, {
      onSuccess: (data: any) => {
        if (data.error) {
          Ping.error("Invalid password reset token");
          throw data.error;
        }

        navigateToLogin();
      },
    });
  }

  return (
    <Main>
      <Shadowbox>
        <Image src={logoDefault} alt="logo" width={"100%"} />
        <Text>Enter your new password</Text>
        <Form>
          <TextInput
            label="Password"
            password
            value={password}
            status={resetPassword.status}
            onChange={handlePasswordChange}
          />

          <AwaitButton
            onPress={handleResetPassword}
            width="100%"
            status={resetPassword.status}
          >
            Reset
          </AwaitButton>
        </Form>
      </Shadowbox>
    </Main>
  );
}

export default ResetPasswordScreen;
