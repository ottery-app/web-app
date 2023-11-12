import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { colors } from "../styles/colors";
import { border } from "../styles/border";
import { radius } from "../styles/radius";
import { margin } from "../styles/margin";
import { clickable } from "../styles/clickable";
import { font } from "../styles/font";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 1.6 * radius.default,
  },
  dropdown: {
    height: 5 * radius.default,
    borderColor: colors.primary.main,
    borderWidth: 0.5 * border.thin,
    borderRadius: 0.8 * radius.default,
    paddingHorizontal: 0.8 * radius.default,
  },
  icon: {
    marginRight: margin.small,
  },
  label: {
    position: "absolute",
    backgroundColor: colors.background.primary,
    left: 2.2 * radius.default,
    top: 0.8 * radius.default,
    zIndex: 999,
    paddingHorizontal: 0.8 * radius.default,
    fontSize: 1.4 * radius.default,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.background.contrast,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: margin.large,
    height: margin.large,
  },
});
//Instead of defining the value as key in the dropdownoption interface we are defining it as label
//because the native dropdoen component are expection values as options/data as label value pairs
interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  placeholder: string;
  onChange: (key: string) => void;
}
const DatalistInput = ({
  label,
  options,
  onChange,
  placeholder,
  value,
}: DropdownProps) => {
  const renderLabel = () => {
    return (
      <Text style={[styles.label, { color: colors.text.primary }]}>
        {label}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, { borderColor: colors.primary.main }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={options}
        maxHeight={2 * clickable.maxHeight}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={(item) => {
          onChange(item.value);
        }}
      />
    </View>
  );
};

export default DatalistInput;
