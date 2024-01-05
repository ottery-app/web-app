import { PropsWithChildren, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { inputType } from "@ottery/ottery-dto/lib/types/input/input.enums";
import { FormFieldDto, noId } from "@ottery/ottery-dto";
import { margin } from "../../../../../ottery-ui/styles/margin";
import { Dropdown, DropdownOption } from "../../../../../ottery-ui/input/Dropdown";
import Button from "../../../../../ottery-ui/buttons/Button";
import { colors } from "../../../../../ottery-ui/styles/colors";
import { radius } from "../../../../../ottery-ui/styles/radius";
import { AppendListItem } from "../../../../../ottery-ui/lists/AppendList";
import TextInput from "../../../../../ottery-ui/input/TextInput";
import { CheckBox, CheckBoxMode } from "../../../../../ottery-ui/input/CheckBox";
import { usePing } from "../../../../../ottery-ping";

function Column({ children }: PropsWithChildren) {
  return <View style={styles.column}>{children}</View>;
}

const INPUT_TYPE_OPTIONS = [
  { label: inputType.TEXT, value: inputType.TEXT },
  { label: inputType.DATE, value: inputType.DATE },
  { label: inputType.NUMBER, value: inputType.NUMBER },
  { label: inputType.CHECKBOX, value: inputType.CHECKBOX },
];

interface CustomFieldProps {
  id: string;
  onDone: (data: AppendListItem<FormFieldDto>) => void;
}

function CustomField({ id, onDone }: CustomFieldProps) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState<inputType>(undefined);
  const [note, setNote] = useState("");
  //const [required, setRequired] = useState(true);
  const Ping = usePing()

  function handleTypeChange({ value: type}: DropdownOption) {
    setType(type);
  }

  function handleNoteChange(note: string) {
    setNote(note);
  }

  function handleDone() {
    if (!label) {
      Ping.error("Label field can not be empty");
      return;
    }

    if (!type) {
      Ping.error("Type field can not be empty");
      return;
    }

    const data = {
      id,
      value: {
        label,
        type,
        note,
        required:true,
        forEvent: noId,
      }
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
          value={label}
          onChange={setLabel}
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
          onChange={handleNoteChange}
          placeholder="Leave a note why you want this field"
          value={note}
        />
        {/* <CheckBox
          label="Required"
          value={required}
          onChange={setRequired}
          mode={CheckBoxMode.filled}
        /> */}
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
