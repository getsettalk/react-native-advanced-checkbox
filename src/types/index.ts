import React, { useCallback } from 'react';
import { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface CheckboxProps {
  /** Current value of the checkbox */
  value?: boolean | string;
  /** Callback when value changes */
  onValueChange?: (value: boolean | string) => void;
  /** Image for checked state */
  checkedImage?: ImageSourcePropType;
  /** Image for unchecked state */
  uncheckedImage?: ImageSourcePropType;
  /** Size of the checkbox */
  size?: number;
  /** Label text */
  label?: string;
  /** Position of label relative to checkbox */
  labelPosition?: 'left' | 'right';
  /** Custom style for label */
  labelStyle?: StyleProp<TextStyle>;
  /** Custom style for container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Custom color when checked */
  checkedColor?: string;
  /** Custom style for checkbox container */
  checkBoxStyle?: StyleProp<ViewStyle>;
  /** Custom color when unchecked */
  uncheckedColor?: string;
  /** Whether checkbox is disabled */
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** Callback when group values change */
  onValueChange?: (values: string[]) => void;
  /** Initial selected values */
  initialValues?: string[];
  /** Custom style for group container */
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}