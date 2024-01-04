import { PropsWithChildren, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { FormFieldDto, classifyWithDto } from "@ottery/ottery-dto";

import { margin } from "../../../../../ottery-ui/styles/margin";
import CustomField from "./CustomField";
import { colors } from "../../../../../ottery-ui/styles/colors";
import { border } from "../../../../../ottery-ui/styles/border";
import { radius } from "../../../../../ottery-ui/styles/radius";
import { Dropdown } from "../../../../../ottery-ui/input/Dropdown";
import { AppendListItem } from "../../../../../ottery-ui/lists/AppendList";

interface DropdownData {
  label: string;
  value: FormFieldDto;
  _index?: number;
}

interface FieldSelectProps {
  value: AppendListItem<FormFieldDto>;
  onDone: (data: AppendListItem<FormFieldDto>) => void;
  options: AppendListItem<FormFieldDto>[];
}

function Row({ children }: PropsWithChildren) {
  return <View style={styles.row}>{children}</View>;
}

function FieldSelect({ onDone, options, value }: FieldSelectProps) {
  const [done, setDone] = useState(classifyWithDto(FormFieldDto, value.value));
  const [note, setNote] = useState(value?.value?.note);
  const [isCustom, setIsCustom] = useState(false);
  const [label, setLabel] = useState(value?.value?.label);
  
  const dropdownData: DropdownData[] = useMemo(() => {

    const dropdowns = [];
    
    for (let i = 0; i < options.length; i++) {
      const option = options[i].value as FormFieldDto;

      //NOTE there may be a bug caused by this
      dropdowns.push({
        value: option,
        label: option.label,
      });
    }

    dropdowns.push({
      label: "Custom",
      value: { id: value.id, note: "Make your own custom field" },
    });

    return dropdowns;
  }, [options]);

  function renderItem(item: DropdownData) {
    return (
      <View style={styles.item}>
        <Text variant="headlineSmall">{item.label}</Text>
        <Text variant="bodyLarge">{item.value.note}</Text>
      </View>
    );
  }

  function handleDropdownChange(item: DropdownData) {
    if (item._index === options.length) {
      // Custom is selected
      setIsCustom(true);

      return;
    }

    handleDone({ value: item.value, id: value.id });
  }

  function handleDone(data: AppendListItem<FormFieldDto>) {
    setLabel(data.value.label);
    setDone(true);
    setNote(data.value.note);
    onDone(data);
  }

  // render
  if (done) {
    return (
      <View>
        <Text style={{fontWeight:"bold"}}>{label}</Text>
        <Text>{note}</Text>
      </View>
    );
  }

  if (isCustom) {
    return <CustomField id={value.id} onDone={handleDone} />;
  }

  return (
    <Dropdown
      onChange={handleDropdownChange}
      options={dropdownData}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: border.default,
    borderRadius: radius.default,
    borderColor: colors.background.secondary,
    padding: margin.small,
  },
  container: {
    width: "100%",
  },
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
  inputSearch: {
    overflow: "hidden",
  },
  item: {
    margin: 8,
  },
});

export default FieldSelect;
