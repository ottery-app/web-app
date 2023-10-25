// import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import MessageBox from "../../../ottery-ui/chat/MessageBox";
import { MessageInput } from "../../../ottery-ui/chat/MessageInput";
import { colors } from "../../../ottery-ui/styles/colors";
// import { useScrollTo } from "../../hooks/useScrollTo";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from "./useChatClient";
import { API_ENV } from "../../env/api.env";
import ScreenWrapper from "../../../ottery-ui/containers/ScreenWrapper";
import ChatBox from "../../../ottery-ui/chat/ChatBox";
import { margin } from "../../../ottery-ui/styles/margin";

function Chat({ route }) {
  const { chatId } = route.params;
  const { useGetChat, useSendMessage } = useChatClient();
  // const [ref, scrollTo] = useScrollTo("instant");
  const getChat = useGetChat({
    inputs: [chatId],
    refetchInterval: API_ENV.query_delta,
    refetchIntervalInBackground: true,
  });
  const sendMessage = useSendMessage();
  const { useUserId } = useAuthClient();
  const selfId = useUserId();
  const messages = getChat?.data?.data.messages;

  // useEffect(scrollTo, [getChat]);

  function send(message) {
    sendMessage.mutate([chatId, message]);
  }

  return (
    <ScreenWrapper withScrollView={false} style={styles.container}>
      <ScreenWrapper>
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
      </ScreenWrapper>

      <View style={styles.inputContainer}>
        <MessageInput onSend={send} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: margin.large,
    paddingRight: margin.large,
    paddingTop: margin.large,
    paddingBottom: margin.large,
  },
  inputContainer: {
    marginTop: margin.large,
    background: colors.background.primary,
  },
});

export default Chat;
