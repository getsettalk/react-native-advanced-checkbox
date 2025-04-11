import React, { useCallback } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { CheckboxGroupProps, CheckboxProps } from '../types';

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  onValueChange,
  initialValues = [], // Only used if no onValueChange is provided
  style,
  children,
}) => {
  const selectedValues = initialValues; // Fallback if uncontrolled

  const handleValueChange = useCallback(
    (value: string | boolean) => {
      if (typeof value !== 'string' || !onValueChange) return;

      const currentValues = selectedValues; // Use parent's state via callback
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      
      onValueChange(newValues);
    },
    [selectedValues, onValueChange]
  );

  return (
    <View style={[styles.container, style]}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<CheckboxProps>(child)) {
          return React.cloneElement<CheckboxProps>(child, {
            onValueChange: handleValueChange,
            value: selectedValues.includes(String(child.props.value)),
          });
        }
        return child;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
});

export default CheckboxGroup;