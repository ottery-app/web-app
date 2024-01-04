import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { DefaultTheme, ThemeProvider } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import { colors } from "../styles/colors";
import { radius } from "../styles/radius";

import TextInput from "./TextInput";

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

  const formattedHours = value?.hours % 12 || 12; // Convert hours to 12-hour format
  const amOrPm = value?.hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

  const minutes = (value?.minutes.toString().length === 1) ? `0${value?.minutes}` : value?.minutes;
  const hours = (formattedHours.toString().length === 1) ? `0${formattedHours}` : formattedHours;

  return (
    <View>
      <TouchableWithoutFeedback onPress={handleTimeInputPress}>
        <View pointerEvents="box-only">
          <TextInput
            style={{width:110}}
            label={label}
            value={`${hours}:${minutes} ${amOrPm}`}
            onChange={()=>{}}
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

export default TimeInput;
