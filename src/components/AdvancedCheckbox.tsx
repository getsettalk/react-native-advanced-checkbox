import React, { useCallback, useRef, useEffect } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  ViewStyle,
  ImageProps,
  TextProps,
  ViewProps,
  PressableProps,
  TextStyle,
  AccessibilityProps,
} from 'react-native';
import { CheckboxProps } from '../types';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'; // Optional

// Type assertions
declare module 'react-native' {
  interface ImageComponent extends React.ComponentClass<ImageProps> {}
  interface TextComponent extends React.ComponentClass<TextProps> {}
  interface ViewComponent extends React.ComponentClass<ViewProps> {}
  interface PressableComponent extends React.ComponentClass<PressableProps> {}
}

const AnimatedView = Animated.createAnimatedComponent(View) as unknown as React.ComponentClass<ViewProps & Animated.AnimatedProps<ViewStyle>>;
const AnimatedText = Animated.createAnimatedComponent(Text) as unknown as React.ComponentClass<TextProps & Animated.AnimatedProps<TextStyle>>;

const AdvancedCheckbox: React.FC<CheckboxProps> = ({
  value = false,
  onValueChange,
  checkedImage,
  uncheckedImage,
  size = 24,
  label,
  labelPosition = 'right',
  labelStyle,
  containerStyle,
  checkedColor = '#007AFF',
  checkBoxStyle,
  uncheckedColor = '#ccc',
  disabled = false,
  animationType = 'bounce', // New: Animation variant
  checkMarkContent, // New: Custom checkmark
  enableHapticFeedback = false, // New: Haptic feedback
  testID, // New: Test ID
  accessibilityLabel, // New: Accessibility
  accessibilityHint, // New: Accessibility
}) => {
  const isChecked = typeof value === 'boolean' ? value : false;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animations = [];
    
    if (animationType === 'bounce') {
      animations.push(
        Animated.timing(scaleAnim, {
          toValue: 0.85,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        })
      );
    } else if (animationType === 'fade') {
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: isChecked ? 1 : 0.5,
          duration: 200,
          useNativeDriver: true,
        })
      );
    } else if (animationType === 'rotate') {
      animations.push(
        Animated.timing(rotateAnim, {
          toValue: isChecked ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
        })
      );
    }

    Animated.sequence([
      ...animations,
      Animated.timing(fadeAnim, {
        toValue: isChecked ? 1 : 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isChecked, scaleAnim, fadeAnim, rotateAnim, animationType]);

  const handlePress = useCallback(() => {
    if (!disabled && onValueChange) {
      if (enableHapticFeedback) {
        ReactNativeHapticFeedback.trigger('impactLight');
      }
      onValueChange(typeof value === 'string' ? value : !isChecked);
    }
  }, [disabled, isChecked, onValueChange, value, enableHapticFeedback]);

  const renderCheckbox = () => {
    if (checkedImage && isChecked) {
      return <Image source={checkedImage} style={{ width: size, height: size }} />;
    }
    if (uncheckedImage && !isChecked) {
      return <Image source={uncheckedImage} style={{ width: size, height: size }} />;
    }

    const rotateInterpolate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '90deg'],
    });

    return (
      <AnimatedView
        style={[
          styles.checkbox,
          checkBoxStyle as ViewStyle,
          {
            width: size,
            height: size,
            borderColor: isChecked ? checkedColor : uncheckedColor,
            backgroundColor: isChecked ? checkedColor : 'transparent',
            transform: [
              { scale: animationType === 'bounce' ? scaleAnim : 1 },
              { rotate: animationType === 'rotate' ? rotateInterpolate : '0deg' },
            ],
            opacity: fadeAnim,
          },
        ]}
        testID={testID ? `${testID}-checkbox` : undefined}
      >
        {isChecked && (
          checkMarkContent ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              {checkMarkContent}
            </Animated.View>
          ) : (
            <AnimatedText
              style={[
                styles.checkMark,
                { fontSize: size * 0.6, opacity: fadeAnim },
              ]}
            >
              ✓
            </AnimatedText>
          )
        )}
      </AnimatedView>
    );
  };

  const content = (
    <>
      {labelPosition === 'left' && label && (
        <Text style={[styles.label, labelStyle]} testID={testID ? `${testID}-label-left` : undefined}>
          {label}
        </Text>
      )}
      {renderCheckbox()}
      {labelPosition === 'right' && label && (
        <Text style={[styles.label, labelStyle]} testID={testID ? `${testID}-label-right` : undefined}>
          {label}
        </Text>
      )}
    </>
  );

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.container,
        containerStyle as ViewStyle,
        { opacity: disabled ? 0.5 : 1 },
      ]}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint || `Toggles checkbox to ${isChecked ? 'off' : 'on'}`}
      testID={testID}
    >
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    borderWidth: 1.5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginHorizontal: 8,
  },
});

export default AdvancedCheckbox;