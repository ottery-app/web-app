import { PropsWithChildren, ReactNode, useCallback, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import DateInput from "../input/DateInput";
import NumericInput from "../input/NumericInput";
import { margin } from "../styles/margin";
import { colors } from "../styles/colors";

export interface HybridOptionProp {
  label?: string;
  key: string;
  type?: "date" | "number";
  props?: Record<string, string | number>;
}

interface HybridRadioGroupProps {
  label?: string;
  options: HybridOptionProp[];
  selectedKey: string;
  selectedValue: any;
  onChange?: (key: string, value: any) => void;
}

interface OptionContainerProps {
  option: HybridOptionProp;
  selectedKey: string;
  onChange: (option: HybridOptionProp) => void;
}

function OptionContainer({
  children,
  onChange,
  option,
  selectedKey,
}: PropsWithChildren & OptionContainerProps) {
  function handlePress() {
    onChange(option);
  }

  return (
    <Pressable style={styles.optionContainer} onPress={handlePress}>
      {children}
      {option.key !== selectedKey && (
        <View style={StyleSheet.absoluteFill}></View>
      )}
    </Pressable>
  );
}

function HybridRadioGroup({
  label,
  onChange,
  options,
  selectedKey,
  selectedValue,
}: HybridRadioGroupProps) {
  const previousValuesRef = useRef(
    options.reduce((acc, curr) => {
      acc[curr.key] = undefined;
      return acc;
    }, {})
  );

  function handleOptionChange(key: string) {
    return (value: any) => {
      // Keep previous value
      previousValuesRef.current[key] = value;
      onChange(key, value);
    };
  }

  function handleOptionPress(option: HybridOptionProp) {
    onChange(option.key, previousValuesRef.current[option.key]);
  }

  const renderComponent = useCallback(
    (option: HybridOptionProp) => {
      const label: ReactNode = option.label ? (
        <Text
          style={
            option.key === selectedKey
              ? styles.selectedOptonLabel
              : styles.defaultOptionLabel
          }
        >
          {option.label}
        </Text>
      ) : null;

      let children: ReactNode | ReactNode[] = null;

      switch (option.type) {
        case undefined:
          children = label;
          break;

        case "date":
          children = [
            label,
            <DateInput
              disabled={option.key !== selectedKey}
              onChange={handleOptionChange(option.key)}
              placeholder={"mm/dd/yyyy"}
              value={
                option.key === selectedKey
                  ? selectedValue
                  : previousValuesRef.current[option.key]
              }
            />,
          ];
          break;

        case "number":
          children = [
            label,
            <NumericInput
              {...option.props}
              disabled={option.key !== selectedKey}
              onChange={handleOptionChange(option.key)}
              value={
                option.key === selectedKey
                  ? selectedValue
                  : previousValuesRef.current[option.key]
              }
            />,
          ];
          break;

        default:
          break;
      }

      return (
        <OptionContainer
          key={option.key}
          onChange={handleOptionPress}
          option={option}
          selectedKey={selectedKey}
        >
          {children}
        </OptionContainer>
      );
    },
    [selectedKey, selectedValue]
  );

  return (
    <View style={styles.container}>
      {!!label && (
        <View style={styles.groupLabel}>
          <Text>{label}</Text>
        </View>
      )}
      {options.map((option) => renderComponent(option))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: margin.large,
  },
  groupLabel: {
    flex: 1,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    padding: margin.large,
    borderRadius: margin.large,
  },
  defaultOptionLabel: {
    color: colors.disabled.main,
  },
  selectedOptonLabel: {
    color: colors.secondary.contrastText,
  },
  overlay: {
    position: "absolute",
  },
});

export default HybridRadioGroup;
