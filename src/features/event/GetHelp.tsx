import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { ChatDto } from "@ottery/ottery-dto";

import RadioGroup, { OptionProp } from "../../../ottery-ui/controls/RadioGroup";
import TextInput from "../../../ottery-ui/input/TextInput";
import { margin } from "../../../ottery-ui/styles/margin";
import Button from "../../../ottery-ui/buttons/Button";
import { BUTTON_STATES } from "../../../ottery-ui/buttons/button.enum";

import { useEventClient } from "./useEventClient";
import { useChatClient } from "../chat/useChatClient";
import { useAuthClient } from "../auth/useAuthClient";
import { usePing } from "../../../ottery-ping";
import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";
import { Main } from "../../../ottery-ui/containers/Main";
import { ButtonSpan } from "../../../ottery-ui/containers/ButtonSpan";

const DEFAULT_TOPICS: OptionProp[] = [
  { label: "I need help at pickup", value: "I need help at pickup" },
  { label: "We need help cleaning up", value: "We need help cleaning up" },
  { label: "We have an emergency", value: "We have an emergency" },
];

function GetHelpScreen({ route }) {
  const eventId = route.params.eventId;

  const [option, setOption] = useState("");
  const [customText, setCustomText] = useState("");
  const message = option || customText;
  const buttonState = !message ? BUTTON_STATES.disabled : BUTTON_STATES.default;

  const { useUserId } = useAuthClient();
  const userId = useUserId();
  const leadManagerId = useEventClient().getLeadManager(eventId);
  const { useMakeChat, useSendMessage } = useChatClient();
  const createChat = useMakeChat();
  const sendMessage = useSendMessage();
  const Ping = usePing();
  const navigator = useNavigator();

  function handleOptionChange(option: string) {
    setOption(option);
    setCustomText("");
  }

  function handleCustomTextChange(text: string) {
    setCustomText(text);
    setOption("");
  }

  const handleSubmit = useCallback(async () => {
    try {
      // Create a chat with the lead manager
      const chatResponse = (await createChat.mutateAsync({
        name: "Get Help",
        users: [userId, leadManagerId],
      })) as { data: ChatDto };

      const chatId = chatResponse.data._id;

      if (chatId) {
        sendMessage.mutate([chatId, message], {
          onSuccess: () => {
            Ping.info("Sent successfully!");
            navigator(paths.main.social.chat, { chatId });
          },
          onError: (err: Error) => {
            Ping.error(err.message);
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [userId, leadManagerId, message]);

  return (
    <Main style={styles.main}>
      <RadioGroup
        onChange={handleOptionChange}
        options={DEFAULT_TOPICS}
        value={option}
      />
      <TextInput
        onChange={handleCustomTextChange}
        placeholder="Custom"
        value={customText}
      />
      <ButtonSpan>
        <Button onPress={handleSubmit} state={buttonState} width={150}>
          Alert manager
        </Button>
      </ButtonSpan>
    </Main>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    gap: margin.large,
  },
});

export default GetHelpScreen;
