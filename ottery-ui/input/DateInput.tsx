import React, { useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { DefaultTheme, TextInput, ThemeProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { colors } from "../styles/colors";

interface DateInputProps {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  value?: string | number | Date;
  onChange: (value: number) => void;
}

const DateInput = ({
  disabled,
  label,
  placeholder,
  value,
  onChange,
}: DateInputProps) => {
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
    if (!date) {
      return undefined;
    }

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
        <View pointerEvents="box-only">
          <TextInput
            disabled={disabled}
            mode="outlined"
            label={label}
            placeholder={placeholder}
            placeholderTextColor={colors.disabled.main}
            value={formatDate(value)}
            onChange={() => {}}
          />
        </View>
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
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          date={value ? new Date(value) : undefined}
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
