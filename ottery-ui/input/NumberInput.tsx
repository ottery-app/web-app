import { TextInput } from "react-native-paper";

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

interface NumberInputProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value?: number) => void;
}

function NumberInput({ label, max, min, onChange, value }) {
  function handleChange(newValue: string) {
    const parsedValue = forceBetween(newValue, min, max);

    if (onChange) {
      onChange(parsedValue);
    }
  }

  return <TextInput label={label} value={value} onChangeText={handleChange} />;
}

export default NumberInput;
