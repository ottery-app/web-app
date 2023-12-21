import { InputProps } from "./Input";
import TextInput from "./TextInput";

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

export interface NumericInputProps extends InputProps<number> {
  min?: number;
  max?: number;
  placeholder?: string;
}

function NumericInput({
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
      label={label}
      mode="outlined"
      onChange={handleChange}
      placeholder={placeholder}
      value={`${value ?? ""}`}
    />
  );
}

export default NumericInput;
