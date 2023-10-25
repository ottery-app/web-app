// import { Main } from "../../components/Main";
// import { IconCard } from "../../../ottery-ui/containers/IconCard";
import { DEFAULT_IMAGES } from "../../../ottery-ui/image/Image";
// import { getInfo } from "../../features/user/userApi";
import { useNavigator } from "../../router/useNavigator";
import paths from "../../router/paths";
import { useAuthClient } from "../auth/useAuthClient";
import { useChatClient } from "./useChatClient";
import { useUserClient } from "../user/useUserClient";
import ChatListItem from "../../../ottery-ui/chat/ChatListItem";
import type { Chat } from "../../../ottery-ui/chat/types/chat";
import ScreenWrapper from "../../../ottery-ui/containers/ScreenWrapper";

function Chat({ chat }: { chat: Chat }) {
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
      senderImage={flagUser?.pfp.src || DEFAULT_IMAGES.pfp}
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
    <ScreenWrapper>
      {chats && chats.map((chat: Chat) => <Chat key={chat._id} chat={chat} />)}
    </ScreenWrapper>
  );
}

export default Messages;
