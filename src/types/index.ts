import React from 'react';
import { ImageSourcePropType, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CheckboxValue = boolean | string | number;

export interface CheckboxProps {
  /** Current value of the checkbox (boolean for standalone, string/number for group) */
  value?: CheckboxValue;
  /** Callback when value changes */
  onValueChange?: (value: any) => void;
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
  /** Animation type for checkmark transition */
  animationType?: 'bounce' | 'fade' | 'rotate';
  /** Custom content for checkmark */
  checkMarkContent?: React.ReactNode;
  /** Test ID for testing frameworks */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
  /** @internal Whether the checkbox is checked (passed by CheckboxGroup) */
  checked?: boolean;
}

export interface CheckboxGroupProps {
  /** Callback when group values change */
  onValueChange?: (values: (string | number)[]) => void;
  /** Current selected values */
  value?: (string | number)[];
  /** Custom style for group container */
  style?: StyleProp<ViewStyle>;
  /** Common size for all checkboxes in the group */
  size?: number;
  /** Common checked color for all checkboxes in the group */
  checkedColor?: string;
  /** Common unchecked color for all checkboxes in the group */
  uncheckedColor?: string;
  /** Common disabled state for all checkboxes in the group */
  disabled?: boolean;
  children: React.ReactNode;
}
