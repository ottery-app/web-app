import { TextInput } from "react-native-paper";
import { colors } from "../styles/colors";

function forceBetween(value: string | undefined, min?: number, max?: number) {
  if (value === undefined || value.length === 0) {
    return undefined;
  }

  const parsedValue = +value;

  if (isNaN(parsedValue)) {
    return min;
  }

  if (min !== undefined && min > parsedValue) {
    return min;
  }

  if (max !== undefined && max < parsedValue) {
    return max;
  }

  return parsedValue;
}

interface NumericInputProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value?: number) => void;
}

function NumericInput({
  disabled,
  label,
  max,
  min,
  onChange,
  placeholder,
  value,
}: NumericInputProps) {
  function handleChange(newValue: string) {
    const parsedValue = forceBetween(newValue, min, max);

    if (onChange) {
      onChange(parsedValue);
    }
  }

  return (
    <TextInput
      disabled={disabled}
      label={label}
      mode="outlined"
      onChangeText={handleChange}
      placeholder={placeholder}
      placeholderTextColor={colors.disabled.main}
      value={`${value ?? ""}`}
    />
  );
}

export default NumericInput;
