import { StyleSheet, View } from "react-native";
import { margin } from "../../../../ottery-ui/styles/margin";
import { ReactNode } from "react";

interface ChatBoxProps {
  children: ReactNode;
}

function ChatBox({ children }: ChatBoxProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: margin.small,
  },
});

export default ChatBox;
