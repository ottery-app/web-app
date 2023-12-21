import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { Input } from "../input/Input";
import { useMemo } from "react";
import { inputType } from "@ottery/ottery-dto";
import { margin } from "../styles/margin";
import { clickable } from "../styles/clickable";
import { colors } from "../styles/colors";


export interface InputRadioOption {
  key: string,
  label?: string,
  props?: Record<string, string | number>
  type: inputType | undefined,
}

export interface InputRadioGroupProps {
  options: InputRadioOption[];
  selected: string
  onChange: (key: string, value: any) => void;
  values: Record<string, any>,
  label: string,
}

export function InputRadioGroup({
  onChange,
  options,
  values,
  selected,
  label,
}: InputRadioGroupProps) {
  const fields = useMemo(()=>options.map((option:InputRadioOption)=>{
    const onChangeInternal = (value)=>{onChange(option.key, value)};

    function select() {
      onChange(option.key, values[option.key]);
    }

    let style = {};
    if (option.key !== selected) {
      style["opacity"] = 0.3;
    }

    const status = (option.key !== selected) ? "disabled" : undefined;

    const internalLabel = (label && option.key === selected) ? label + " " + option.label : option.label;

    return (
      <TouchableOpacity onPress={select}>
        <View style={styles.radio}>
          <View style={styles.radioLabel}>
            <Text style={{color:(option.key === selected) ? "black" : colors.disabled.main}}>{internalLabel}</Text>
          </View>
          <View style={[styles.radioInput, style]}>
            {(option.type === undefined)
              ? undefined
              : <Input
                {...option.props}
                type={option.type}
                status={status}
                value={values[option.key]}
                onChange={onChangeInternal}
              />
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }), [values, selected]);

  return  <View style={styles.options}>
    {fields}
  </View>
}

const styles = StyleSheet.create({
  options: {
    gap:margin.large,
    width: "100%",
  },
  radio: {
    height:clickable.minHeight,
    gap: margin.small,
    justifyContent: "space-between",
    alignItems:"center",
    flexDirection:"row",
  },
  radioLabel: {
    flex: 4,
  }, 
  radioInput: {
    flex: 6
  }
})
