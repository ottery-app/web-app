import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { DefaultTheme, TextInput, ThemeProvider } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import { colors } from "../styles/colors";
import { radius } from "../styles/radius";

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

  const minutes = (value?.minutes.toString().length === 1) ? `0${value?.minutes}` : value?.minutes;
  const hours = (value?.hours.toString().length === 1) ? `0${value?.hours}` : value?.hours;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleTimeInputPress}>
        <View pointerEvents="box-only">
          <TextInput
            keyboardType="numeric"
            label={label}
            mode="outlined"
            outlineColor={colors.primary.dark}
            outlineStyle={{ borderRadius: radius.default }}
            style={{ borderColor: colors.primary.dark }}
            value={`${hours}:${minutes}`}
          />
        </View>
      </TouchableWithoutFeedback>
      <ThemeProvider
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: colors.primary.dark,
            onPrimary: colors.primary.contrastText,
            primaryContainer: colors.primary.main,
            onPrimaryContainer: colors.primary.dark,
            secondaryContainer: colors.background.primary,
            surfaceVariant: colors.primary.contrastText,
            onSurfaceVariant: colors.primary.dark,
            outline: colors.primary.dark,
            onSurface: colors.primary.dark,
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
