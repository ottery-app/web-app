import React, { useState } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { DefaultTheme, ThemeProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { colors } from "../styles/colors";
import { InputProps } from "./Input";
import TextInput from "./TextInput";

interface DateInputProps extends InputProps<string | number | Date> {}

const DateInput = ({
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
    <View style={{width:"100%"}}>
      <TouchableWithoutFeedback onPress={() => setOpen(true)} style={{width:"100%"}}>
        <View pointerEvents="box-only" style={{width:"100%"}}>
          <TextInput
            mode="outlined"
            label={label}
            placeholder={placeholder}
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
          allowEditing={false}
          locale="en"
          mode="single"
          visible={open}
          date={value ? new Date(value) : undefined}
          animationType="fade"
          label={label || "Date"}
          saveLabel="SAVE"
          onConfirm={onConfirmSingle}
          onDismiss={onDismissSingle}
        />
      </ThemeProvider>
    </View>
  );
};

export default DateInput;
