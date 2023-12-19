import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from "./useChatClient";
import { useUserClient } from "../user/useUserClient";
import ChatListItem from "./components/ChatListItem";
import { Chat as ChatDto } from "./components/types/chat";
import { pfp } from "../../../assets/icons";
import React from "react";
import { Main } from "../../../ottery-ui/containers/Main";
import { fadedStyle, fadedVariant } from "../event/tempzone/tempzone.style";
import { Text } from "react-native-paper";

function Chat({ chat }: { chat: InstanceType<typeof ChatDto> }) {
  const { useUserId } = useAuthClient();
  const { useGetUserInfo } = useUserClient();

  const selfId = useUserId();
  const navigator = useNavigator();
  const flagUserLoad = useGetUserInfo({
    inputs: [chat.users.filter((id) => id !== selfId)[0]],
  });

  const flagUser = flagUserLoad?.data?.data[0];
  const message = chat.messages[chat.messages.length - 1];

  function selectChat() {
    navigator(paths.main.social.chat, { chatId: chat._id });
  }

  return (
    <ChatListItem
      onPress={selectChat}
      senderImage={flagUser?.pfp?.src || pfp.src}
      senderName={
        flagUser ? `${flagUser.firstName} ${flagUser.lastName}` : undefined
      }
      lastMessage={message?.message}
      sentAt={message?.date}
    />
  );
}

function Messages() {
  const { useUserId } = useAuthClient();
  const { useGetChatsFor } = useChatClient();
  const userId = useUserId();
  const chatsRes = useGetChatsFor({ inputs: [userId] });
  let chats = chatsRes?.data?.data;

  return (
    <Main>
      {(chats &&
        chats
          .sort(
            (
              b: InstanceType<typeof ChatDto>,
              a: InstanceType<typeof ChatDto>
            ) =>
              a.messages[a.messages.length - 1]?.date -
              b.messages[b.messages.length - 1]?.date
          )
          .map((chat: InstanceType<typeof ChatDto>) => (
            <Chat key={chat._id} chat={chat} />
          ))) || <Text variant={fadedVariant} style={fadedStyle}>You have no messages</Text>}
    </Main>
  );
}

export default Messages;
