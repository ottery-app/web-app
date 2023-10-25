import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { IconButton, TextInput } from "react-native-paper";

import { margin } from "../styles/margin";

export function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");

  function handleTextInputChange(e) {
    setMessage(e.target.value);
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
        size={24}
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
    gap: margin.medium,
  },
  textInput: {
    flex: 9,
  },
  sendButton: {
    flex: 1,
  },
});
