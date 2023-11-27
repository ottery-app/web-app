import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { ChatDto } from "@ottery/ottery-dto";

import ScreenWrapper from "../../../ottery-ui/containers/ScreenWrapper";
import RadioGroup, {
  OptionProps,
} from "../../../ottery-ui/controls/Radio/RadioGroup";
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

const DEFAULT_TOPICS: OptionProps[] = [
  { value: "I need help at pickup" },
  { value: "We need help cleaning up" },
  { value: "We have an emergency" },
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
    <ScreenWrapper
      contentContainerStyle={styles.container}
      withScrollView={false}
    >
      <View style={styles.topContainer}>
        <RadioGroup
          onChange={handleOptionChange}
          options={DEFAULT_TOPICS}
          selectedValue={option}
        />
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          onChange={handleCustomTextChange}
          placeholder="Custom"
          value={customText}
        />
        <Button

          onPress={handleSubmit}
          state={buttonState}
          styles={styles.submitButton}
        >
          <Text style={styles.buttonText}>Send to manager</Text>
        </Button>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: margin.medium,
  },
  submitButton: {
    marginTop: margin.large,
    alignItems: "center",
    width: "50%",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});

export default GetHelpScreen;
