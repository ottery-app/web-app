import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Shadowbox from "../../../ottery-ui/containers/Shadowbox";
import Image from "../../../ottery-ui/image/Image";
import { logoDefault } from "../../../assets/logos";
import { Form, Main } from "./loginStyles";
import TextInput from "../../../ottery-ui/input/TextInput";
import { AwaitButton } from "../../guards/AwaitButton";
import { usePing } from "../../../ottery-ping";
import { useAuthClient } from "./useAuthClient";

function ForgotPasswordScreen() {
  const Ping = usePing();
  const { useForgotPassword } = useAuthClient();
  const forgotPassword = useForgotPassword();

  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  function handleEmailChange(text: string) {
    setEmail(text);
  }

  function requestPasswordResetLink() {
    forgotPassword.mutate(
      { email },
      {
        onSuccess: (data: any) => {
          if (data.error) {
            Ping.error("Invalid email");
            throw data.error;
          }

          setIsEmailSent(true);
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
            status={forgotPassword.status}
            onChange={handleEmailChange}
          />
          {isEmailSent && (
            <View style={styles.infoContainer}>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                Email sent
              </Text>
              <Text style={{ fontSize: 12 }}>
                Check your email and open the link we sent to continue
              </Text>
            </View>
          )}
          <AwaitButton
            onPress={requestPasswordResetLink}
            width="100%"
            status={forgotPassword.status}
          >
            Send Email
          </AwaitButton>
        </Form>
      </Shadowbox>
    </Main>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    alignSelf: "flex-start",
  },
});

export default ForgotPasswordScreen;
