import { GestureResponderEvent } from "react-native";
import { Avatar, List } from "react-native-paper";
import { Time, DateFormat } from "../../../../ottery-ui/text/Time";
import { colors } from "../../../../ottery-ui/styles/colors";
import { useThemeMaker } from "../../../../ottery-ui/styles/Color";

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
  dateFormat = DateFormat.passed,
  onPress,
}: ChatListItemProps) {
  const pfpTheme = useThemeMaker({ primary: colors.tertiary });

  return (
    <List.Item
      left={(props) => (
        <Avatar.Image
          theme={pfpTheme}
          style={props.style}
          source={{ uri: senderImage }}
        />
      )}
      title={senderName}
      description={lastMessage}
      right={() => (isNaN(sentAt)) ? undefined : <Time time={sentAt} type={dateFormat} />}
      onPress={onPress}
    />
  );
}

export default ChatListItem;
