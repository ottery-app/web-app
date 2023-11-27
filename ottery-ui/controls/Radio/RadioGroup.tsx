import { StyleSheet, View } from "react-native";
import { margin } from "../../styles/margin";
import { CheckBox, CheckBoxMode } from "../../input/CheckBox";

export interface OptionProps {
  label?: string;
  value: string | number;
}

export interface RadioGroupProps {
  options?: readonly OptionProps[];
  selectedValue?: string | number;
  onChange: (selectedValue: any) => void;
}

function RadioGroup({ onChange, options, selectedValue }: RadioGroupProps) {
  return <View style={styles.container}>
    {options.map((option) =>
        <CheckBox
          key={option.value}
          label={option.label || `${option.value}`}
          mode={CheckBoxMode.filled}
          onChange={onChange}
          value={option.value === selectedValue}
        />
    )}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    gap: margin.small,
  },
});

export default RadioGroup;
