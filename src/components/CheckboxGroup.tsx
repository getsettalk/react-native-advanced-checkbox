import React, { useCallback } from 'react';
import { View, StyleSheet, ViewStyle, Text } from 'react-native';
import { CheckboxGroupProps, CheckboxProps } from '../types';

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  onValueChange,
  initialValues = [], // Controlled by parent
  style,
  children,
}) => {
  const handleValueChange = useCallback(
    (value: string | boolean) => {
      if (typeof value !== 'string' || !onValueChange) return;

      console.log('Group handleValueChange, value:', value, 'currentValues:', initialValues);
      const newValues = initialValues.includes(value)
        ? initialValues.filter((v) => v !== value)
        : [...initialValues, value];
      
      console.log('New values:', newValues);
      onValueChange(newValues); // Pass the computed array directly
    },
    [onValueChange, initialValues]
  );

  return (
    <View style={[styles.container, style]}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<CheckboxProps>(child)) {
          const childValue = String(child.props.value);
          return React.cloneElement<CheckboxProps>(child, {
            value: childValue, // Pass the string value
            onValueChange: handleValueChange,
            checkMarkContent: initialValues.includes(childValue) ? <Text>✓</Text> : null, // Reflect checked state
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