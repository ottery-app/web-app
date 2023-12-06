import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { DefaultTheme, TextInput, ThemeProvider } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import { colors } from "../styles/colors";

export interface TimeValueType {
  hours?: number;
  minutes?: number;
}

interface TimeInputProps {
  label?: string;
  value: TimeValueType;
  onChange: (newTime: TimeValueType) => void;
}

function TimeInput({ label, value, onChange }: TimeInputProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  function handleTimeInputPress() {
    setIsPickerOpen(true);
  }

  function handleConfirmTime({ hours, minutes }: TimeValueType) {
    setIsPickerOpen(false);
    onChange({ hours, minutes });
  }

  function handleDismissTime() {
    setIsPickerOpen(false);
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleTimeInputPress}>
        <TextInput
          keyboardType="numeric"
          label={label}
          mode="outlined"
          outlineColor={colors.primary.main}
          outlineStyle={{ borderRadius: 10 }}
          style={{ borderColor: colors.primary.main }}
          value={`${value.hours}:${value.minutes}`}
        />
      </TouchableWithoutFeedback>
      <ThemeProvider
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: colors.primary.main,
            onPrimary: colors.primary.contrastText,
          },
        }}
      >
        <TimePickerModal
          hours={value.hours}
          minutes={value.minutes}
          onConfirm={handleConfirmTime}
          onDismiss={handleDismissTime}
          visible={isPickerOpen}
        />
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TimeInput;
