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
} from 'react-native';
import { CheckboxProps } from '../types';

// Type assertion to fix JSX component recognition
declare module 'react-native' {
    interface ImageComponent extends React.ComponentClass<ImageProps> { }
    interface TextComponent extends React.ComponentClass<TextProps> { }
    interface ViewComponent extends React.ComponentClass<ViewProps> { }
    interface PressableComponent extends React.ComponentClass<PressableProps> { }
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
}) => {
    const isChecked = typeof value === 'boolean' ? value : false;

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.85,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: isChecked ? 1 : 0.7,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, [isChecked, scaleAnim, fadeAnim]);

    const handlePress = useCallback(() => {
        if (!disabled && onValueChange) {
            onValueChange(typeof value === 'string' ? value : !isChecked);
        }
    }, [disabled, isChecked, onValueChange, value]);

    const renderCheckbox = () => {
        if (checkedImage && isChecked) {
            return <Image source={checkedImage} style={{ width: size, height: size }} />;
        }
        if (uncheckedImage && !isChecked) {
            return <Image source={uncheckedImage} style={{ width: size, height: size }} />;
        }
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
                        transform: [{ scale: scaleAnim }],
                        opacity: fadeAnim,
                    },
                ]}
            >
                {isChecked && (
                    <AnimatedText
                        style={[
                            styles.checkMark,
                            { fontSize: size * 0.6, opacity: fadeAnim },
                        ]}
                    >
                        ✓
                    </AnimatedText>
                )}
            </AnimatedView>
        );
    };

    const content = (
        <>
            {labelPosition === 'left' && label && (
                <Text style={[styles.label, labelStyle]}>{label}</Text>
            )}
            {renderCheckbox()}
            {labelPosition === 'right' && label && (
                <Text style={[styles.label, labelStyle]}>{label}</Text>
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