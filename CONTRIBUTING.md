### `CONTRIBUTING.md`

# Contributing to react-native-advanced-checkbox

Thank you for your interest in contributing to `react-native-advanced-checkbox`! We welcome contributions from the community to improve this package. Whether it’s bug fixes, new features, or documentation enhancements, your help is appreciated.

## How to Contribute

### 1. Fork the Repository
- Fork the repository on GitHub: [https://github.com/getsettalk/react-native-advanced-checkbox](https://github.com/getsettalk/react-native-advanced-checkbox).
- Clone your fork locally:
  ```bash
  git clone https://github.com/YOUR_USERNAME/react-native-advanced-checkbox.git
  cd react-native-advanced-checkbox
  ```

### 2. Set Up the Development Environment
- Install dependencies:
  ```bash
  npm install
  # or
  yarn install
  ```
- Build the project:
  ```bash
  npm run build
  # or
  yarn build
  ```

### 3. Make Your Changes
- Create a new branch for your changes:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- Implement your changes in the `src` directory (e.g., `AdvancedCheckbox.tsx`, `CheckboxGroup.tsx`, or `types/index.ts`).
- Ensure your code follows the existing style and TypeScript conventions.

### 4. Test Your Changes
- Test locally by linking to a React Native project:
  ```bash
  npm link
  cd /path/to/your/test-app
  npm link react-native-advanced-checkbox
  npx react-native run-android # or run-ios
  ```
- Verify that your changes work across RN 0.72.0 and the latest version (e.g., 0.79.x).

### 5. Submit a Pull Request
- Commit your changes:
  ```bash
  git add .
  git commit -m "feat: add your feature description"
  ```
- Push to your fork:
  ```bash
  git push origin feature/your-feature-name
  ```
- Open a pull request (PR) on the main repository to dev branch:
  - Go to [https://github.com/getsettalk/react-native-advanced-checkbox](https://github.com/getsettalk/react-native-advanced-checkbox).
  - Click "New Pull Request" and select your branch.
  - Provide a clear title and description of your changes.

## Guidelines
- **Code Style**: Follow the existing code style (e.g., 2-space indentation, TypeScript strict mode).
- **Commits**: Use descriptive commit messages (e.g., `fix: resolve animation bug`, `feat: add new prop`).
- **Testing**: Ensure your changes don’t break existing functionality. Add tests if possible (future test suite planned).
- **Compatibility**: Target React Native `>=0.72.0` and React `>=18.2.0`.

## Issues
- Check the [Issues](https://github.com/getsettalk/react-native-advanced-checkbox/issues) tab for bugs or feature requests to work on.
- If you’re unsure, comment on an issue or open a new one to discuss your idea.

## Questions?
Contact the maintainer at [GitHub](https://github.com/getsettalk) or open an issue for discussion.

We look forward to your contributions!

