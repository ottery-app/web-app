import { StyleSheet, View } from "react-native";
import Radio, { RadioMode } from "./Radio";
import { margin } from "../../styles/margin";

export interface OptionProps {
  label?: string;
  value: string | number;
}

export interface RadioGroupProps {
  options?: readonly OptionProps[];
  selectedValue?: string | number;
  onChange: (selectedValue: string | number) => void;
}

function RadioGroup({ onChange, options, selectedValue }: RadioGroupProps) {
  return options.map((option) => (
    <View style={styles.container}>
      <Radio
        checked={option.value === selectedValue}
        key={option.value}
        label={option.label || `${option.value}`}
        mode={RadioMode.FILLED}
        onChange={onChange}
        value={option.value}
      />
    </View>
  ));
}

const styles = StyleSheet.create({
  container: {
    margin: margin.medium,
  },
});

export default RadioGroup;
