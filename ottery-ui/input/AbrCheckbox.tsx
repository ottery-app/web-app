import { StyleSheet } from "react-native";

import Button from "../buttons/Button";
import { clickable } from "../styles/clickable";
import { radius } from "../styles/radius";
import { colors } from "../styles/colors";

interface AbrCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function AbrCheckbox({ checked, label, onChange }: AbrCheckboxProps) {
  function handlePress() {
    onChange(!checked);
  }

  const contentStyle = checked ? styles.checked : styles.default;
  return (
    <Button
      height={clickable.minHeight}
      onPress={handlePress}
      radius={radius.round}
      styles={contentStyle}
      width={clickable.minWidth}
    >
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: colors.background.contrast,
    color: colors.secondary.main,
  },
  checked: {
    backgroundColor: colors.success.main,
    color: colors.primary.main,
  },
});

export default AbrCheckbox;
