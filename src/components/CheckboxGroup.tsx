import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { CheckboxGroupProps } from '../types';

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
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, {
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