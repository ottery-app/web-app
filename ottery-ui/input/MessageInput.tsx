import { useState } from "react";
import TextInput from "./TextInput";
import { InputIconWrapper } from "./InputIconWrapper";
import { send } from "../../assets/icons";

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
    <InputIconWrapper icon={send} onPress={handleSendMessage}>
      <TextInput
        value={message}
        onChange={handleTextInputChange}
      />
    </InputIconWrapper>
  );
}
