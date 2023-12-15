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

  const bgStyle = checked ? styles.bgChecked : styles.bgDefault;
  const colorStyle = checked ? styles.colorChecked : styles.colorDefault;

  return (
    <Button
      height={clickable.minHeight}
      labelStyle={colorStyle}
      onPress={handlePress}
      radius={radius.round}
      styles={bgStyle}
      width={clickable.minWidth}
    >
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  bgDefault: {
    backgroundColor: colors.background.secondary,
  },
  bgChecked: {
    backgroundColor: colors.primary.main,
  },
  colorDefault: {
    color: colors.secondary.contrastText,
  },
  colorChecked: {
    color: colors.primary.contrastText,
  },
});

export default AbrCheckbox;
