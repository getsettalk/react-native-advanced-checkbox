# react-native-advanced-checkbox

A versatile, customizable checkbox component for React Native with TypeScript support, animations, haptic feedback, and group functionality.

[![npm version](https://badge.fury.io/js/react-native-advanced-checkbox.svg)](https://badge.fury.io/js/react-native-advanced-checkbox)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

Install the package via npm or Yarn:

```bash
npm install react-native-advanced-checkbox
# or
yarn add react-native-advanced-checkbox
```

### Optional Dependency
For haptic feedback support, install `react-native-haptic-feedback`:
```bash
npm install react-native-haptic-feedback
# or
yarn add react-native-haptic-feedback
```

## Features
- **TypeScript Support**: Fully typed with TypeScript for a seamless development experience.
- **Custom Images**: Use custom images for checked and unchecked states.
- **Color Customization**: Set colors for checked and unchecked states.
- **Label Support**: Add labels with customizable positioning (left or right).
- **Checkbox Groups**: Manage multiple checkboxes with `CheckboxGroup`.
- **Animations**: Choose from `bounce`, `fade`, or `rotate` animation types.
- **Haptic Feedback**: Optional tactile feedback on interaction (requires `react-native-haptic-feedback`).
- **Accessibility**: Built-in support for screen readers with `accessibilityLabel` and `accessibilityHint`.
- **Testability**: Includes `testID` for integration with testing frameworks.
- **Cross-Platform**: Fully compatible with iOS and Android.
- **New Architecture**: Supports React Native's New Architecture (Fabric) with `useNativeDriver`.

## Compatibility
- **React Native**: `>=0.72.0` (tested up to 0.74.x and beyond)
- **React**: `>=18.2.0` (tested up to 19.x)

## Usage

### Basic Example
A simple checkbox with a label:

```tsx
import React, { useState } from 'react';
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';

const App = () => {
  const [checked, setChecked] = useState(false);

  return (
    <AdvancedCheckbox
      value={checked}
      onValueChange={setChecked}
      label="Agree to terms"
      checkedColor="#007AFF"
      uncheckedColor="#ccc"
      size={24}
    />
  );
};

export default App;
```

### Checkbox Group Example
Manage multiple checkboxes with `CheckboxGroup`:

```tsx
import React, { useState } from 'react';
import { CheckboxGroup, AdvancedCheckbox } from 'react-native-advanced-checkbox';

const App = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>(['option1']);

  return (
    <CheckboxGroup
      onValueChange={setSelectedValues}
      initialValues={['option1']}
    >
      <AdvancedCheckbox value="option1" label="Option 1" checkedColor="#FF6347" />
      <AdvancedCheckbox value="option2" label="Option 2" checkedColor="#FF6347" />
      <AdvancedCheckbox value="option3" label="Option 3" checkedColor="#FF6347" />
    </CheckboxGroup>
  );
};

export default App;
```

### Advanced Customization
Customize animations, styles, and content:

```tsx
import React, { useState } from 'react';
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';

const App = () => {
  const [checked, setChecked] = useState(false);

  return (
    <AdvancedCheckbox
      value={checked}
      onValueChange={setChecked}
      label="Custom Checkbox"
      labelPosition="left"
      checkedColor="#28a745"
      uncheckedColor="#6c757d"
      size={30}
      animationType="rotate"
      checkBoxStyle={{ borderRadius: 8 }}
      labelStyle={{ fontSize: 18, color: '#333' }}
      enableHapticFeedback={true}
      testID="custom-checkbox"
      accessibilityLabel="Toggle custom option"
      accessibilityHint="Toggles the custom checkbox on or off"
    />
  );
};

export default App;
```

### Props

#### `AdvancedCheckbox` Props
| Prop                  | Type                     | Default       | Description                                      |
|-----------------------|--------------------------|---------------|--------------------------------------------------|
| `value`              | `boolean \| string`      | `false`       | Current value of the checkbox                   |
| `onValueChange`      | `(value: boolean \| string) => void` | - | Callback when value changes            |
| `checkedImage`       | `ImageSourcePropType`    | -             | Image for checked state                        |
| `uncheckedImage`     | `ImageSourcePropType`    | -             | Image for unchecked state                      |
| `size`               | `number`                 | `24`          | Size of the checkbox                            |
| `label`              | `string`                 | -             | Label text                                      |
| `labelPosition`      | `'left' \| 'right'`     | `'right'`     | Position of label relative to checkbox          |
| `labelStyle`         | `StyleProp<TextStyle>`   | -             | Custom style for label                          |
| `containerStyle`     | `StyleProp<ViewStyle>`   | -             | Custom style for container                      |
| `checkedColor`       | `string`                 | `'#007AFF'`   | Color when checked                              |
| `checkBoxStyle`      | `StyleProp<ViewStyle>`   | -             | Custom style for checkbox container             |
| `uncheckedColor`     | `string`                 | `'#ccc'`      | Color when unchecked                            |
| `disabled`           | `boolean`                | `false`       | Whether checkbox is disabled                    |
| `animationType`      | `'bounce' \| 'fade' \| 'rotate'` | `'bounce'` | Animation type for checkmark transition |
| `checkMarkContent`   | `React.ReactNode`        | `✓`           | Custom content for checkmark                    |
| `enableHapticFeedback` | `boolean`             | `false`       | Enable haptic feedback on press                 |
| `testID`             | `string`                 | -             | Test ID for testing frameworks                  |
| `accessibilityLabel` | `string`                 | -             | Accessibility label for screen readers          |
| `accessibilityHint`  | `string`                 | -             | Accessibility hint for screen readers           |

#### `CheckboxGroup` Props
| Prop              | Type                     | Default | Description                                      |
|-------------------|--------------------------|---------|--------------------------------------------------|
| `onValueChange`  | `(values: string[]) => void` | -   | Callback when group values change               |
| `initialValues`  | `string[]`               | `[]`    | Initial selected values                         |
| `style`          | `StyleProp<ViewStyle>`   | -       | Custom style for group container                |
| `children`       | `React.ReactNode`        | -       | Child `AdvancedCheckbox` components             |

## Customization
- **Custom Images**: Provide `checkedImage` and `uncheckedImage` for unique visuals:
  ```tsx
  <AdvancedCheckbox
    checkedImage={require('./checked.png')}
    uncheckedImage={require('./unchecked.png')}
  />
  ```
- **Color and Style**: Adjust colors and styles:
  ```tsx
  <AdvancedCheckbox
    checkedColor="#FF6347"
    uncheckedColor="#6c757d"
    checkBoxStyle={{ borderRadius: 10, borderWidth: 2 }}
  />
  ```
- **Custom Checkmark**: Replace the default `✓`:
  ```tsx
  <AdvancedCheckbox checkMarkContent={<Text style={{ color: '#fff' }}>✔</Text>} />
  ```

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project. We welcome pull requests!

## Code of Conduct
Please review our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) to understand the expectations for participation in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
- Sujeet Kumar ([GitHub](https://github.com/getsettalk))

## Support
For issues or feature requests, please file an issue on the [GitHub repository](https://github.com/getsettalk/react-native-advanced-checkbox).
