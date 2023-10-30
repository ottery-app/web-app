import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import MessageBox from "./components/MessageBox";
import { MessageInput } from "../../../ottery-ui/input/MessageInput";
import { colors } from "../../../ottery-ui/styles/colors";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from "./useChatClient";
import { API_ENV } from "../../env/api.env";
import ScreenWrapper from "../../../ottery-ui/containers/ScreenWrapper";
import ChatBox from "./components/ChatBox";
import { margin } from "../../../ottery-ui/styles/margin";
import ChatBoxWrapper from "./components/ChatBoxWrapper";
import { Button } from "react-native-paper";

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

  const { isSuccess } = getChat;
  const messages = getChat?.data?.data.messages || [];
  const messageCount = messages.length;

  const [isNewMessage, setIsNewMessage] = useState(false);
  const isInitialMessagesRendered = useRef(false);
  const [isScrollEnd, setIsScrollEnd] = useState(true);

  useEffect(() => {
    if (isInitialMessagesRendered.current) {
      setIsNewMessage(true);
      if (isScrollEnd) {
        scrollToEnd();
      }
    }
  }, [messageCount]);

  useEffect(() => {
    if (isSuccess) {
      isInitialMessagesRendered.current = true;
      scrollToEnd();
    }
  }, [isSuccess]);

  function send(message) {
    sendMessage.mutate([chatId, message]);
  }

  function scrollToEnd() {
    scrollViewRef.current?.scrollToEnd({ animated: false });
    setIsNewMessage(false);
  }

  function handleScroll({
    nativeEvent: { contentOffset, contentSize, layoutMeasurement },
  }) {
    if (contentOffset.y + layoutMeasurement.height < contentSize.height) {
      setIsScrollEnd(false);
    } else {
      setIsScrollEnd(true);
    }
  }

  return (
    <ScreenWrapper withScrollView={false}>
      <ChatBoxWrapper ref={scrollViewRef} onScroll={handleScroll}>
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
      {!isScrollEnd && isNewMessage && (
        <Button onPress={scrollToEnd}>See new messages</Button>
      )}
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
