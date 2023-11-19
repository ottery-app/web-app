import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown as DropdownInner } from "react-native-element-dropdown";
import { colors } from "../styles/colors";
import { border } from "../styles/border";
import { radius } from "../styles/radius";
import { margin } from "../styles/margin";
import { clickable } from "../styles/clickable";
import { zindex } from "../styles/zindex";

const styles = StyleSheet.create({
  container: {
    paddingTop: margin.small,
    paddingBottom: margin.small,
  },
  dropdown: {
    height: clickable.minHeight * 1.5, //arbitrary number
    borderColor: colors.primary.main,
    borderWidth: border.thin,
    borderRadius: radius.default,
    paddingHorizontal: margin.medium,
    backgroundColor: colors.background.primary,
  },
  label: {
    position: "absolute",
  },
  labelContainer:{
    position: "relative",
    backgroundColor: colors.background.primary,

    transform: [{translateX: margin.small}, {translateY: -10}], //arbitrary number
    zIndex: zindex.front,
    paddingHorizontal: margin.small,
  },
  placeholderStyle: {
    color: colors.text.tertiary,
  },
  selectedTextStyle: {
    color: colors.text.primary
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
  placeholder?: string;
  onChange: (key: string) => void;
}

export function Dropdown({
  label,
  options,
  onChange,
  placeholder=label,
  value,
}: DropdownProps) {
  return (
    <View style={styles.container}>
      {(value) ? <View style={styles.labelContainer}><Text style={styles.label}>{label}</Text></View> : undefined}
      <DropdownInner
        style={[styles.dropdown, { borderColor: colors.primary.main }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={options}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={(item)=>onChange(item.value)}
      />
    </View>
  );
};
