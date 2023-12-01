import { StyleSheet, View } from "react-native";
import { margin } from "../styles/margin";
import { CheckBox, CheckBoxMode } from "../input/CheckBox";

export interface OptionProp {
  label: string;
  value: any;
}

export interface RadioGroupProps {
  options: OptionProp[]
  value: any;
  onChange: (value: any) => void;
}

function RadioGroup({ onChange, options, value }: RadioGroupProps) {
  return <View><View style={styles.container}>
    {options.map((option) =>
        <CheckBox
          key={option.value}
          label={option.label || `${option.value}`}
          mode={CheckBoxMode.filled}
          onChange={()=>onChange(option.value)}
          value={option.value === value}
        />
    )}
  </View></View>
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    gap: margin.medium,
  },
});

export default RadioGroup;
