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

const DEFAULT_TOPICS: OptionProps[] = [
  { value: "I need help at pickup" },
  { value: "We need help cleaning up" },
  { value: "We have an emergency" },
];

function GetHelpScreen({ route }) {
  const [topic, setTopic] = useState("");

  const eventId = route.eventId;

  function handleChange(topic: string) {
    setTopic(topic);
  }

  return (
    <ScreenWrapper
      contentContainerStyle={styles.container}
      withScrollView={false}
    >
      <View style={styles.topContainer}>
        <RadioGroup
          onChange={handleChange}
          options={DEFAULT_TOPICS}
          selectedValue={topic}
        />
      </View>
      <View style={styles.bottomContainer}>
        <TextInput placeholder="Custom" />
        <Button minWidth={200} minHeight={56} styles={styles.submitButton}>
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
