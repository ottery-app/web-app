import { StyleSheet, View } from "react-native";
import AbrCheckbox from "../input/AbrCheckbox";

interface OptionProp {
  index: number;
  label: string;
  value: any;
}

interface AbrCheckboxGroupProps {
  options: OptionProp[];
  selectedIndexes: number[];
  onChange: (selectedIndexes: number[]) => void;
}

function AbrCheckboxGroup({
  onChange,
  options,
  selectedIndexes,
}: AbrCheckboxGroupProps) {
  function handleOptionChange(index: number) {
    return (checked: boolean) => {
      let newSelectedIndexes = [];

      if (checked) {
        newSelectedIndexes = selectedIndexes.concat(index);
        newSelectedIndexes.sort((a, b) => {
          if (a < b) {
            return -1;
          } else {
            return 1;
          }
        });
      } else {
        newSelectedIndexes = selectedIndexes.filter(
          (selectedIndex) => selectedIndex !== index
        );
      }

      const selectedValues = options
        .filter((option) => newSelectedIndexes.includes(option.index))
        .map((selectedOptions) => selectedOptions.index);

      onChange(selectedValues);
    };
  }

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <AbrCheckbox
          key={option.index}
          label={option.label}
          value={selectedIndexes.includes(option.index)}
          onChange={handleOptionChange(option.index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default AbrCheckboxGroup;
