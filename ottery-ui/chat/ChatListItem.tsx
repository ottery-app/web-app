import { GestureResponderEvent } from "react-native";
import { Avatar, List } from "react-native-paper";

import { DateFormat } from "./types/chat";
import { Time } from "../text/Time";

export interface ChatListItemProps {
  onPress: (e: GestureResponderEvent) => void;
  senderImage: string;
  senderName?: string;
  lastMessage?: string;
  sentAt?: number;
  dateFormat?: DateFormat;
}

function ChatListItem({
  senderImage,
  senderName,
  lastMessage,
  sentAt,
  dateFormat = DateFormat.md,
  onPress,
}: ChatListItemProps) {
  return (
    <List.Item
      left={(props) => (
        <Avatar.Image style={props.style} source={{ uri: senderImage }} />
      )}
      title={senderName}
      description={lastMessage}
      right={(props) => <Time time={sentAt} type={dateFormat} />}
      onPress={onPress}
    />
  );
}

export default ChatListItem;
