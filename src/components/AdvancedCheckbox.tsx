import React, { useCallback, useRef, useEffect, useMemo } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  ViewStyle,
} from 'react-native';
import { CheckboxProps } from '../types';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);

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
  animationType = 'bounce',
  checkMarkContent,
  testID,
  accessibilityLabel,
  accessibilityHint,
  checked: checkedProp,
}) => {
  // Determine if checked: use checkedProp (from group) or value (standalone)
  const isChecked = useMemo(() => {
    if (checkedProp !== undefined) return checkedProp;
    return typeof value === 'boolean' ? value : false;
  }, [checkedProp, value]);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(isChecked ? 1 : 0.7)).current;
  const rotateAnim = useRef(new Animated.Value(isChecked ? 1 : 0)).current;

  useEffect(() => {
    const animations = [];
    
    if (animationType === 'bounce') {
      animations.push(
        Animated.sequence([
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
        ])
      );
    }

    if (animationType === 'fade') {
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: isChecked ? 1 : 0.5,
          duration: 200,
          useNativeDriver: true,
        })
      );
    }

    if (animationType === 'rotate') {
      animations.push(
        Animated.timing(rotateAnim, {
          toValue: isChecked ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
        })
      );
    }

    // Always ensure fadeAnim is at least 0.7 for visible state if not specifically 'fade'
    if (animationType !== 'fade') {
      animations.push(
        Animated.timing(fadeAnim, {
          toValue: isChecked ? 1 : 0.7,
          duration: 200,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start();
  }, [isChecked, animationType, scaleAnim, fadeAnim, rotateAnim]);

  const handlePress = useCallback(() => {
    if (!disabled && onValueChange) {
      onValueChange(value);
    }
  }, [disabled, onValueChange, value]);

  const renderCheckbox = () => {
    if (checkedImage && isChecked) {
      return <Image source={checkedImage} style={{ width: size, height: size }} />;
    }
    if (uncheckedImage && !isChecked) {
      return <Image source={uncheckedImage} style={{ width: size, height: size }} />;
    }

    const rotateInterpolate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '45deg'],
    });

    const inverseRotateInterpolate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-45deg'],
    });

    const animatedStyle: any = {
      width: size,
      height: size,
      borderColor: isChecked ? checkedColor : uncheckedColor,
      backgroundColor: isChecked ? checkedColor : 'transparent',
      transform: [
        { scale: animationType === 'bounce' ? scaleAnim : 1 },
        { rotate: animationType === 'rotate' ? rotateInterpolate : '0deg' },
      ],
      opacity: fadeAnim,
    };

    return (
      <AnimatedView
        style={[
          styles.checkbox,
          checkBoxStyle,
          animatedStyle,
        ]}
        testID={testID ? `${testID}-checkbox` : undefined}
      >
        {isChecked && (
          <Animated.View 
            style={{ 
              opacity: fadeAnim,
              transform: [{ rotate: animationType === 'rotate' ? inverseRotateInterpolate : '0deg' }]
            }}
          >
            {checkMarkContent ? (
              checkMarkContent
            ) : (
              <AnimatedText
                style={[
                  styles.checkMark,
                  { fontSize: size * 0.6 },
                ]}
              >
                ✓
              </AnimatedText>
            )}
          </Animated.View>
        )}
      </AnimatedView>
    );
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.container,
        containerStyle,
        { opacity: disabled ? 0.5 : 1 },
      ]}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={accessibilityHint || `Toggles checkbox to ${isChecked ? 'off' : 'on'}`}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
      testID={testID}
    >
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
