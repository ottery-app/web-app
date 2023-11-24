import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";

import { colors } from "../../styles/colors";
import { margin } from "../../styles/margin";
import { clickable } from "../../styles/clickable";
import { radius } from "../../styles/radius";
import Button from "../../buttons/Button";

export enum RadioMode {
  DEFAULT = "DEFAULT",
  FILLED = "FILLED",
}

export interface RadioProps {
  mode: RadioMode;
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  checked?: boolean;
}

interface IconProps {
  active?: boolean;
  textVariant: "headlineSmall" | "titleMedium";
}

function Icon({ active, textVariant }: IconProps) {
  return active ? (
    <Text variant={textVariant} style={stylesBox(active).box}>
      &#10004;
    </Text>
  ) : (
    <Text variant={textVariant} style={stylesBox(active).box}>
      &#x2716;
    </Text>
  );
}

function Radio({ checked, label, mode, onChange, value }: RadioProps) {
  const textVariant =
    mode === RadioMode.FILLED ? "headlineSmall" : "titleMedium";

  function handlePress(value: string | number) {
    return () => {
      if (!checked) {
        onChange(value);
      }
    };
  }

  return mode === RadioMode.DEFAULT ? (
    <View style={stylesDefault.main}>
      <Button
        width={clickable.minWidth}
        onPress={handlePress(value)}
        color={value ? colors.success : colors.disabled}
      >
        <Icon active={checked} textVariant={textVariant} />
      </Button>
      <Text variant={textVariant}>{label}</Text>
    </View>
  ) : (
    <TouchableOpacity
      style={[stylesFilled.main, stylesBox(checked).box]}
      onPress={handlePress(value)}
    >
      <View
        style={[stylesFilled.main, stylesFilled.inner, stylesBox(checked).box]}
      >
        <Text style={stylesBox(checked).box} variant={textVariant}>
          {label}
        </Text>
        <Icon active={checked} textVariant={textVariant} />
      </View>
    </TouchableOpacity>
  );
}

const stylesBox = (checked: boolean) =>
  StyleSheet.create({
    box: {
      backgroundColor: checked ? colors.success.main : colors.disabled.main,
      color: checked
        ? colors.success.contrastText
        : colors.disabled.contrastText,
    },
  });

const stylesDefault = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: margin.medium,
  },
});

const stylesFilled = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: margin.medium,
    width: "100%",
    borderRadius: radius.default,
  },
  inner: {
    padding: margin.large,
  },
});

export default Radio;
