# react-native-advanced-checkbox

A versatile, customizable checkbox component for React Native with TypeScript support.

## Installation
```bash
npm install react-native-advanced-checkbox
```

## Features
- TypeScript support
- Custom images for checked/unchecked states
- Color customization
- Label support with positioning
- Checkbox groups
- Fully compatible with iOS and Android
- New architecture support

## Usage

### Basic Example

```jsx
import React, { useState } from 'react';
import { AdvancedCheckbox } from 'react-native-advanced-checkbox';

const App = () => {
  const [checked, setChecked] = useState(false);

  return (
    <AdvancedCheckbox
      value={checked}
      onValueChange={setChecked}
      label="Agree to terms"
    />
  );
};

export default App;
```

### Checkbox Group Example

```jsx
import React, { useState } from 'react';
import { CheckboxGroup, AdvancedCheckbox } from 'react-native-advanced-checkbox';

const App = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  return (
    <CheckboxGroup onValueChange={setSelectedValues} initialValues={['option1']}>
      <AdvancedCheckbox value="option1" label="Option 1" />
      <AdvancedCheckbox value="option2" label="Option 2" />
      <AdvancedCheckbox value="option3" label="Option 3" />
    </CheckboxGroup>
  );
};

export default App;
```

### Customization

- **Custom Images**: You can provide custom images for checked and unchecked states.
- **Color and Style**: Customize the checkbox color, label position, and style using the available props.
- **Label Positioning**: Place labels on the left or right of the checkbox.

