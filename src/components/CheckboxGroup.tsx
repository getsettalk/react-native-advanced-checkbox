import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckboxGroupProps, CheckboxProps } from '../types';

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  onValueChange,
  value = [],
  style,
  size,
  checkedColor,
  uncheckedColor,
  disabled,
  children,
}) => {
  const handleValueChange = useCallback(
    (selectedValue: any) => {
      if (!onValueChange) return;

      const isAlreadySelected = value.includes(selectedValue);
      const newValues = isAlreadySelected
        ? value.filter((v) => v !== selectedValue)
        : [...value, selectedValue];
      
      onValueChange(newValues);
    },
    [onValueChange, value]
  );

  return (
    <View style={[styles.container, style]}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<CheckboxProps>(child)) {
          const childValue = child.props.value;
          // Only wrap if child has a value (string or number)
          if (childValue !== undefined && typeof childValue !== 'boolean') {
            return React.cloneElement(child, {
              checked: value.includes(childValue),
              onValueChange: handleValueChange,
              // Propagate common props if not overridden by child
              size: child.props.size ?? size,
              checkedColor: child.props.checkedColor ?? checkedColor,
              uncheckedColor: child.props.uncheckedColor ?? uncheckedColor,
              disabled: child.props.disabled ?? disabled,
            } as CheckboxProps);
          }
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
