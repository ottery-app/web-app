import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { IconButton } from "react-native-paper";
import TextInput from "./TextInput";

import { margin } from "../styles/margin";
import { clickable } from "../styles/clickable";

export function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");

  function handleTextInputChange(text: string) {
    setMessage(text);
  }

  function handleSendMessage() {
    setMessage("");
    onSend(message);
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        onChange={handleTextInputChange}
        style={styles.textInput}
      />
      <IconButton
        icon="send"
        size={clickable.minHeight}
        onPress={handleSendMessage}
        style={styles.sendButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: margin.small,
  },
  textInput: {
    flex: 9,
  },
  sendButton: {
    flex: 1,
  },
});
