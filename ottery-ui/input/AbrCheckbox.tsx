import { StyleSheet } from "react-native";

import Button from "../buttons/Button";
import { clickable } from "../styles/clickable";
import { radius } from "../styles/radius";
import { colors } from "../styles/colors";
import { CheckBoxProps } from "./CheckBox";

interface AbrCheckboxProps extends CheckBoxProps {}

function AbrCheckbox( props : AbrCheckboxProps) {
  function handlePress() {
    props.onChange(!props.value);
  }

  const bgStyle = props.value ? styles.bgChecked : styles.bgDefault;
  const colorStyle = props.value ? styles.colorChecked : styles.colorDefault;

  return (
    <Button
      height={clickable.minHeight}
      labelStyle={colorStyle}
      onPress={handlePress}
      radius={radius.round}
      styles={bgStyle}
      width={clickable.minWidth}
    >
      {props.label}
    </Button>
  );
}

const styles = StyleSheet.create({
  bgDefault: {
    backgroundColor: colors.disabled.main,
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
