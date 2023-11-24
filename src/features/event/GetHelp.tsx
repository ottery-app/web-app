import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import ScreenWrapper from "../../../ottery-ui/containers/ScreenWrapper";
import RadioGroup, {
  OptionProps,
} from "../../../ottery-ui/controls/Radio/RadioGroup";
import TextInput from "../../../ottery-ui/input/TextInput";
import { margin } from "../../../ottery-ui/styles/margin";
import Button from "../../../ottery-ui/buttons/Button";
import { colors } from "../../../ottery-ui/styles/colors";
import { BUTTON_STATES } from "../../../ottery-ui/buttons/button.enum";

const DEFAULT_TOPICS: OptionProps[] = [
  { value: "I need help at pickup" },
  { value: "We need help cleaning up" },
  { value: "We have an emergency" },
];

function GetHelpScreen({ route }) {
  const [option, setOption] = useState("");
  const [customText, setCustomText] = useState("");

  const eventId = route.eventId;

  function handleOptionChange(option: string) {
    setOption(option);
    setCustomText("");
  }

  function handleCustomTextChange(text: string) {
    setCustomText(text);
    setOption("");
  }

  function handleSubmit(message: string) {
    console.log("message sent", message);
  }

  const message = option || customText;
  const buttonState = !message ? BUTTON_STATES.disabled : BUTTON_STATES.default;

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      withScrollView={false}
    >
      <View style={styles.topContainer}>
        <RadioGroup
          onChange={handleOptionChange}
          options={DEFAULT_TOPICS}
          selectedValue={option}
        />
      </View>
      <View style={styles.bottomContainer}>
        <TextInput
          onChange={handleCustomTextChange}
          placeholder="Custom"
          value={customText}
        />
        <Button
          minHeight={56}
          minWidth={200}
          onPress={handleSubmit}
          state={buttonState}
          styles={styles.submitButton}
        >
          <Text style={styles.buttonText}>Send to manager</Text>
        </Button>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: margin.medium,
  },
  submitButton: {
    marginTop: margin.large,
    alignItems: "center",
    width: "50%",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});

export default GetHelpScreen;
