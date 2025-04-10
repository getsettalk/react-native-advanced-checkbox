import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { CheckboxGroupProps, CheckboxProps } from '../types';

// Type assertion for View
declare module 'react-native' {
  interface ViewComponent extends React.ComponentClass<ViewProps> {}
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  onValueChange,
  initialValues = [],
  style,
  children,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(initialValues);

  const handleValueChange = useCallback(
    (value: string | boolean) => {
      if (typeof value !== 'string') return;

      const newValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      
      setSelectedValues(newValues);
      onValueChange?.(newValues);
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