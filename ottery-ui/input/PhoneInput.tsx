import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../styles/colors';
import { margin } from '../styles/margin';


const PhoneNumberInput = ({label,value,onChange}) => {
  const [validationText, setValidationText] = useState('');
  useEffect(() => {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$|^$/;

    if (phoneRegex.test(value)) {
      setValidationText('');
    } else {
      setValidationText('Please enter a valid phone number!');
    }
  },[value])

  return (
    <View>
      <TextInput
        mode='outlined'
        label={label}
        outlineStyle={{ borderRadius: 10 }}
        outlineColor={colors.primary.main}
        placeholder="Phone number"
        placeholderTextColor={colors.background.contrast}
        keyboardType="numeric"
        onChangeText={(text) => onChange(text)}
        value={value}
      />
      <Text style={{marginLeft: margin.small, marginTop: margin.small, fontSize: 12, color: colors.error.main}} >{validationText}</Text>
    </View>
  );
};

export default PhoneNumberInput;
