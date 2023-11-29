import React, { useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { DefaultTheme, TextInput, ThemeProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { colors } from "../styles/colors";
import { InputProps } from "./Input";

export interface  DateInputProps extends InputProps<number> {}

const DateInput = ({ label, value = new Date().getTime(), onChange }: DateInputProps) => {
  const [open, setOpen] = useState(false);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      onChange(params.date.getTime());
    },
    [setOpen, onChange]
  );

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  function formatDate(date) {
    date = new Date(date);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${month}/${day}/${year}`;
  }

  return (
    //here we are not giving any placeholder text for this input instead we are displaying the present date when the date input button is used
    <View>
      <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <TextInput
          mode="outlined"
          label={label}
          outlineStyle={{ borderRadius: 10 }}
          style={{ borderColor: colors.primary.main }}
          outlineColor={colors.primary.main}
          keyboardType="numeric"
          value={formatDate(value)}
        />
      </TouchableWithoutFeedback>
      <ThemeProvider theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: colors.primary.main,
          onPrimary: colors.primary.contrastText,
        }
      }}>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          date={new Date(value)}
          animationType="fade"
          label={label}
          saveLabel="SAVE"
          onConfirm={onConfirmSingle}
          onDismiss={onDismissSingle}
        />
      </ThemeProvider>
    </View>
  );
};

export default DateInput;
