import { PropsWithChildren, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { FormFieldDto, classifyWithDto } from "@ottery/ottery-dto";

import { margin } from "../../../../../ottery-ui/styles/margin";
import CustomField from "./CustomField";
import { nanoid } from "@reduxjs/toolkit";
import { colors } from "../../../../../ottery-ui/styles/colors";
import { border } from "../../../../../ottery-ui/styles/border";
import { radius } from "../../../../../ottery-ui/styles/radius";

export type FieldData = Partial<FormFieldDto> & {
  id: string;
};

interface DropdownData {
  label: string;
  value: FieldData;
  _index?: number;
}

interface FieldSelectProps {
  value: FieldData;
  onDone: (data: FieldData) => void;
  options: FieldData[];
}

function Column({ children }: PropsWithChildren) {
  return <View style={styles.column}>{children}</View>;
}

function Row({ children }: PropsWithChildren) {
  return <View style={styles.row}>{children}</View>;
}

function FieldSelect({ onDone, options, value }: FieldSelectProps) {
  const [done, setDone] = useState(classifyWithDto(FormFieldDto, value));
  const [isCustom, setIsCustom] = useState(false);
  const [label, setLabel] = useState(value.label);

  const dropdownData: DropdownData[] = useMemo(() => {
    return options
      .map((option) => {
        return { label: option.label, value: option };
      })
      .concat({
        label: "Custom",
        value: { id: value.id, note: "Make your own custom field" },
      });
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

    onDone({ ...item.value, id: value.id });
  }

  function handleSearchKeywordChange(search: string) {
    console.log(search);
  }

  function handleDone(data: FieldData) {
    setLabel(data.label);
    setDone(true);

    onDone(data);
  }

  // render
  if (done) {
    return (
      <Row>
        <Text>{label}</Text>
      </Row>
    );
  }

  if (isCustom) {
    return <CustomField id={value.id} onDone={handleDone} />;
  }

  return (
    <Dropdown<DropdownData>
      containerStyle={styles.container}
      data={dropdownData}
      inputSearchStyle={styles.inputSearch}
      labelField="label"
      maxHeight={300}
      minHeight={100}
      mode="default"
      onChange={handleDropdownChange}
      onChangeText={handleSearchKeywordChange}
      renderItem={renderItem}
      search
      searchField="label"
      style={styles.dropdown}
      valueField="value"
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
