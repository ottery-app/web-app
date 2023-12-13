import { PropsWithChildren, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { nanoid } from "@reduxjs/toolkit";
import { inputType } from "@ottery/ottery-dto/lib/types/input/input.enums";
import { CustomFormFieldDto, classifyWithDto } from "@ottery/ottery-dto";

import { margin } from "../../../../../ottery-ui/styles/margin";
import { useFormClient } from "../../../form/useFormClient";
import Error from "../../../../../ottery-ui/text/Error";
import { Dropdown } from "../../../../../ottery-ui/input/Dropdown";
import { CheckBox } from "../../../../../ottery-ui/input/CheckBox";
import Button from "../../../../../ottery-ui/buttons/Button";
import { colors } from "../../../../../ottery-ui/styles/colors";
import { radius } from "../../../../../ottery-ui/styles/radius";

function Column({ children }: PropsWithChildren) {
  return <View style={styles.column}>{children}</View>;
}

function Row({ children }: PropsWithChildren) {
  return <View style={styles.row}>{children}</View>;
}

const INPUT_TYPE_OPTIONS = [
  { label: inputType.DATE, value: inputType.DATE },
  { label: inputType.NUMBER, value: inputType.NUMBER },
  { label: inputType.TEXT, value: inputType.TEXT },
  { label: inputType.PHONE, value: inputType.PHONE },
  { label: inputType.EMAIL, value: inputType.EMAIL },
];

export type FieldData = Partial<CustomFormFieldDto> & { id: string };

interface CustomFieldProps {
  data: FieldData;
  onDone: (data: FieldData) => void;
}

function CustomField({ data, onDone }: CustomFieldProps) {
  const id = data.id || nanoid();

  const [label, setLabel] = useState(data.label);
  const [type, setType] = useState(data.type);
  const [note, setNote] = useState(data.note);
  const [permanent, setPermanent] = useState(data.permanent);
  const [done, setDone] = useState(classifyWithDto(CustomFormFieldDto, data));
  const [error, setError] = useState("");

  // const { useGetAllFormFields } = useFormClient();
  // const fieldsData = useGetAllFormFields();
  // const fields = fieldsData?.data?.data || [];

  useEffect(() => {
    setError("");
  }, [label, type]);

  function handleEdit() {
    setDone(false);
  }

  function handleTypeChange(type: inputType) {
    setType(type);
  }

  function handleNoteChange(note: string) {
    setNote(note);
  }

  function handlePermanentChange(permanent: boolean) {
    setPermanent(permanent);
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
      label,
      type,
      optional: false,
      note,
      permanent,
      id,
    };
    onDone(data);
    setDone(true);
  }

  if (done) {
    return (
      <Row>
        <IconButton
          containerColor={colors.success.dark}
          icon="pen"
          iconColor={colors.primary.contrastText}
          mode="contained"
          onPress={handleEdit}
        />
        <Text>{label}</Text>
      </Row>
    );
  }

  return (
    <>
      <Column>
        <TextInput
          label="Label"
          mode="outlined"
          placeholder="Name of the field"
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
          value={note}
        />
        <CheckBox
          label="Mark as permanent"
          onChange={handlePermanentChange}
          value={permanent}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: margin.medium,
  },
  actions: {
    alignItems: "center",
    marginTop: margin.large,
  },
});

export default CustomField;
