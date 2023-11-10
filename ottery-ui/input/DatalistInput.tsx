import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '../styles/colors';

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: colors.primary.main,
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color: colors.background.contrast
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
//Instead of defining the value as key in the dropdownoption interface we are defining it as label 
//because the native dropdoen component are expection values as options/data as label value pairs
  interface DropdownOption {
    label: string;
    value: string;
  }

  interface DropdownProps {
    label: string;
    options: DropdownOption[];
    value: string;
    placeholder: string;
    onChange: (key: string) => void
  }
  const DatalistInput = ({label, options, onChange, placeholder, value}: DropdownProps) => {
    const renderLabel = () => {
        return (
          <Text style={[styles.label,{ color: colors.text.primary }]}>
            {label}
          </Text>
        );
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown,{ borderColor: colors.primary.main }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={options}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder="Search"
          value={value}
          onChange={item => {
            onChange(item.value);
          }}
        />
      </View>
    );
  };

  export default DatalistInput;