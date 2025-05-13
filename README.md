
# 🎯 **react-native-advanced-checkbox**

<p align="center">
  <img src="https://github.com/user-attachments/assets/67078496-e975-45b1-8682-45c1d8a2b0c4" alt="react-native-advanced-checkbox" width="500"/>
</p>

<p align="center">
  <strong>A versatile, customizable checkbox component for React Native</strong><br/>
  Built with TypeScript · Animations · Group Management
</p>

<p align="center">
  <a href="https://badge.fury.io/js/react-native-advanced-checkbox">
    <img src="https://badge.fury.io/js/react-native-advanced-checkbox.svg" alt="npm version" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" />
  </a>
  <a href="code_of_conduct.md">
    <img src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg" alt="Contributor Covenant" />
  </a>
</p>

---

## 🚀 Installation

Install the package via npm or Yarn:

```bash
npm install react-native-advanced-checkbox
# or
yarn add react-native-advanced-checkbox
```

---

## ✨ Features

- ✅ **TypeScript Support**
- 🖼️ **Custom Images** for checked/unchecked states
- 🎨 **Color Customization** (checked / unchecked)
- 🏷️ **Labels** with left/right positioning
- 🧠 **Checkbox Groups** with `CheckboxGroup`
- 🎞️ **Animations**: `bounce`, `fade`, `rotate`
- ♿ **Accessibility**: screen reader support
- 🧪 **Testability**: `testID` support
- 📱 **Cross-Platform** (iOS & Android)
- ⚛️ **New Architecture Ready** with `useNativeDriver`

---

## 📦 Compatibility

| Package        | Version         |
|----------------|-----------------|
| **React Native** | `>= 0.72.0` (tested up to 0.79.x) |
| **React**        | `>= 18.2.0` (tested up to 19.x)  |

---

## 🧑‍💻 Usage

### ✅ Basic Example

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

---

### 👥 Checkbox Group Example

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { CheckboxGroup, AdvancedCheckbox } from 'react-native-advanced-checkbox';

const App = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>(['option1']);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CheckboxGroup onValueChange={setSelectedValues}>
        <AdvancedCheckbox value="option1" label="Option 1" checkedColor="#FF6347" />
        <AdvancedCheckbox value="option2" label="Option 2" checkedColor="#FF6347" />
        <AdvancedCheckbox value="option3" label="Option 3" checkedColor="#FF6347" />
      </CheckboxGroup>
    </View>
  );
};

export default App;
```

---

### ⚙️ Advanced Customization

```tsx
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
  testID="custom-checkbox"
  accessibilityLabel="Toggle custom option"
  accessibilityHint="Toggles the custom checkbox on or off"
/>
```

---

## 📋 Props

### `AdvancedCheckbox`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean \| string` | `false` | Current value |
| `onValueChange` | `(value: boolean \| string) => void` | - | Callback |
| `checkedImage` / `uncheckedImage` | `ImageSourcePropType` | - | Custom images |
| `size` | `number` | `24` | Size of checkbox |
| `label` | `string` | - | Label text |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Label alignment |
| `labelStyle`, `containerStyle`, `checkBoxStyle` | `StyleProp` | - | Styling |
| `checkedColor` / `uncheckedColor` | `string` | `#007AFF` / `#ccc` | Colors |
| `disabled` | `boolean` | `false` | Disable checkbox |
| `animationType` | `'bounce' \| 'fade' \| 'rotate'` | `'bounce'` | Animation type |
| `checkMarkContent` | `React.ReactNode` | `✓` | Custom checkmark |
| `testID`, `accessibilityLabel`, `accessibilityHint` | `string` | - | Test & a11y support |

### `CheckboxGroup`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onValueChange` | `(values: string[]) => void` | - | Callback |
| `initialValues` | `string[]` | `[]` | Initial selection |
| `style` | `StyleProp<ViewStyle>` | - | Group style |
| `children` | `React.ReactNode` | - | Checkbox items |

---

## 🎨 Customization Tips

```tsx
// Custom images and you can call image url also here
<AdvancedCheckbox
  checkedImage={require('./checked.png')} 
  uncheckedImage={require('./unchecked.png')}
/>

// Custom colors and style
<AdvancedCheckbox
  checkedColor="#FF6347"
  uncheckedColor="#6c757d"
  checkBoxStyle={{ borderRadius: 10, borderWidth: 2 }}
/>

// Custom checkmark content
<AdvancedCheckbox
  checkMarkContent={<Text style={{ color: '#fff' }}>✔</Text>}
/>
```

---

## 🤝 Contributing

We welcome contributions! Check out our [CONTRIBUTING.md](CONTRIBUTING.md) for details.

> ⚠️ All development work must be submitted as a pull request to the `dev` branch.
> Pull requests targeting `main` will be rejected or closed.

---

## 📜 Code of Conduct

Read our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) to help maintain a welcoming community.

---

## 📄 License

MIT © [Sujeet Kumar](https://github.com/getsettalk)  
See [LICENSE](LICENSE) for full details.

---

## 🛠 Support & Feedback

Found a bug or have a feature request?  
Please open an issue on [GitHub](https://github.com/getsettalk/react-native-advanced-checkbox).

