import { useEffect, useRef, useState } from "react";
import { View } from "react-native";

import MessageBox from "./components/MessageBox";
import { MessageInput } from "../../../ottery-ui/input/MessageInput";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from "./useChatClient";
import ChatBox from "./components/ChatBox";
import ChatBoxWrapper from "./components/ChatBoxWrapper";
import Button from "../../../ottery-ui/buttons/Button";
import { useUserClient } from "../user/useUserClient";
import { IconHeader } from "../../../ottery-ui/headers/IconHeader";
import { query_delta } from "../../provider/clideInst";
import { clickable } from "../../../ottery-ui/styles/clickable";
import { useScreenDimensions } from "../../hooks/dimentions.hook";
import { Main } from "../../../ottery-ui/containers/Main";

function Chat({ route }) {
  const { chatId } = route.params;
  const { useGetChat, useSendMessage } = useChatClient();
  const getChat = useGetChat({
    inputs: [chatId],
    refetchInterval: query_delta,
    refetchIntervalInBackground: true,
  });
  const {width} = useScreenDimensions();

  const sendMessage = useSendMessage();
  const { useUserId } = useAuthClient();
  const selfId = useUserId();

  const scrollViewRef = useRef(null);

  const { isSuccess } = getChat;
  const messages = getChat?.data?.data.messages || [];
  const messageCount = messages.length;

  const otherId = getChat?.data?.data.users.filter((id)=>selfId!==id)[0];
  const otherUser = useUserClient().useGetUserInfo({
    inputs: [otherId],
    enabled: !!otherId
  })

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
    <Main scrollable={false} margins={false}>
      <IconHeader
        src={otherUser?.data?.data[0].pfp}
        title={otherUser?.data?.data[0].firstName + " " + otherUser?.data?.data[0].lastName}
      />
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
      {!isScrollEnd && isNewMessage  && (
        <View styles={{position:"relative"}}>
          <Button styles={{
              position:"absolute",
              top: -clickable.minHeight,
              transform: [{translateX: width / 4}],
            }} 
            width={width / 2}
            onPress={scrollToEnd}
          >See new messages</Button>
        </View>
      )}
      <MessageInput onSend={send} />
    </Main>
  );
};

export default Chat;
