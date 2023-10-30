import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

import MessageBox from "../../../ottery-ui/chat/MessageBox";
import { MessageInput } from "../../../ottery-ui/input/MessageInput";
import { colors } from "../../../ottery-ui/styles/colors";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from "./useChatClient";
import { API_ENV } from "../../env/api.env";
import ScreenWrapper from "../../../ottery-ui/containers/ScreenWrapper";
import ChatBox from "../../../ottery-ui/chat/ChatBox";
import { margin } from "../../../ottery-ui/styles/margin";
import ChatBoxWrapper from "./components/ChatBoxWrapper";

function Chat({ route }) {
  const { chatId } = route.params;
  const { useGetChat, useSendMessage } = useChatClient();
  const getChat = useGetChat({
    inputs: [chatId],
    refetchInterval: API_ENV.query_delta,
    refetchIntervalInBackground: true,
  });
  const sendMessage = useSendMessage();
  const { useUserId } = useAuthClient();
  const selfId = useUserId();

  const scrollViewRef = useRef(null);

  const messages = getChat?.data?.data.messages || [];

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, [messages.length]);

  function send(message) {
    sendMessage.mutate([chatId, message]);
  }

  return (
    <ScreenWrapper withScrollView={false}>
      <ChatBoxWrapper ref={scrollViewRef}>
        <ChatBox>
          {messages?.map((message, i) => (
            <MessageBox
              key={i}
              self={message.sender === selfId}
              date={message.date}
              content={message.message}
            />
          ))}
        </ChatBox>
      </ChatBoxWrapper>

      <View style={styles.inputContainer}>
        <MessageInput onSend={send} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: margin.small,
    marginRight: margin.small,
    marginLeft: margin.small,
    background: colors.background.primary,
  },
});

export default Chat;
