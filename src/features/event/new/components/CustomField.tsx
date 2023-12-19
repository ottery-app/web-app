import { PropsWithChildren, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { nanoid } from "@reduxjs/toolkit";
import { inputType } from "@ottery/ottery-dto/lib/types/input/input.enums";
import { FormFieldDto, classifyWithDto } from "@ottery/ottery-dto";

import { margin } from "../../../../../ottery-ui/styles/margin";
import Error from "../../../../../ottery-ui/text/Error";
import { Dropdown, DropdownOption } from "../../../../../ottery-ui/input/Dropdown";
import Button from "../../../../../ottery-ui/buttons/Button";
import { colors } from "../../../../../ottery-ui/styles/colors";
import { radius } from "../../../../../ottery-ui/styles/radius";
import { FieldData } from "./FieldSelect";

function Column({ children }: PropsWithChildren) {
  return <View style={styles.column}>{children}</View>;
}

const INPUT_TYPE_OPTIONS = [
  { label: inputType.DATE, value: inputType.DATE },
  { label: inputType.NUMBER, value: inputType.NUMBER },
  { label: inputType.TEXT, value: inputType.TEXT },
  { label: inputType.PHONE, value: inputType.PHONE },
  { label: inputType.EMAIL, value: inputType.EMAIL },
];

interface CustomFieldProps {
  id: string;
  onDone: (data: FieldData) => void;
}

function CustomField({ id, onDone }: CustomFieldProps) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState<inputType>(undefined);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [label, type]);

  function handleTypeChange({ value: type}: DropdownOption) {
    setType(type);
  }

  function handleNoteChange(note: string) {
    setNote(note);
  }

  function handleDone() {
    if (!label) {
      setError("Label field can not be empty");
      return;
    }

    if (!type) {
      setError("Type field can not be empty");
      return;
    }

    const data = {
      id,
      label,
      type,
      note,
    };

    onDone(data);
  }

  return (
    <>
      <Column>
        <TextInput
          label="Label"
          mode="outlined"
          placeholder="Name of the field"
          placeholderTextColor={colors.background.secondary}
          value={label}
          onChangeText={setLabel}
        />
        <Dropdown
          label="Type"
          onChange={handleTypeChange}
          options={INPUT_TYPE_OPTIONS}
          value={type}
        />
        <TextInput
          label="Note"
          mode="outlined"
          multiline
          numberOfLines={4}
          onChangeText={handleNoteChange}
          placeholder="Leave a note why you want this feild"
          placeholderTextColor={colors.background.secondary}
          value={note}
        />
        <View style={styles.actions}>
          <Button
            color={colors.success}
            onPress={handleDone}
            radius={radius.default}
          >
            Save field
          </Button>
        </View>
      </Column>
      <Error>{error}</Error>
    </>
  );
}

const styles = StyleSheet.create({
  column: {
    alignItems: "stretch",
    justifyContent: "center",
    gap: margin.medium,
  },
  actions: {
    alignItems: "center",
    marginTop: margin.large,
  },
});

export default CustomField;
