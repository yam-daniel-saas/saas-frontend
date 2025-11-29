import React from 'react';
import { View, Text, TextInput, type TextInputProps, Pressable } from 'react-native';
import { cn } from '@/utils/cn';
import Ionicons from '@expo/vector-icons/Ionicons';
import { isRTL } from '@/i18n';
import { Text as ThemedText } from '@/components/ui/ThemedText';

type InputProps = {
  label?: string;
  required?: boolean;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onEndIconPress?: () => void;
  onStartIconPress?: () => void;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputWrapperClassName?: string;
} & TextInputProps &
  React.RefAttributes<TextInput>;

function Input({
  label,
  required,
  error,
  startIcon,
  endIcon,
  onEndIconPress = () => {
    return;
  },
  onStartIconPress = () => {
    return;
  },
  containerClassName,
  labelClassName,
  inputClassName,
  inputWrapperClassName,
  editable = true,
  ...props
}: InputProps) {
  const inputId = props.accessibilityLabel || label || 'input';

  return (
    <View className={cn('w-full gap-1 px-2', containerClassName)}>
      {/* Label */}
      {label && (
        <ThemedText className={cn('text-md px-2 font-medium text-foreground', labelClassName)}>
          {label}
          {required && <Text className="text-destructive"> *</Text>}
        </ThemedText>
      )}

      {/* Input Wrapper - Relative positioning like the example */}
      <View className="relative">
        {/* Input Container */}

        <TextInput
          className={cn(
            'peer flex h-14 w-full flex-row items-center rounded-full border border-input bg-white ps-3 text-base leading-5 text-foreground focus:border-primary focus:ring-primary',
            isRTL ? 'ps-4' : 'pe-4',
            startIcon && 'ps-12',
            endIcon && 'pe-12',
            inputClassName
          )}
          style={{ writingDirection: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left' }}
          accessibilityLabel={label || props.placeholder}
          accessibilityHint={error || undefined}
          accessibilityLabelledBy={label ? `${inputId}-label` : undefined}
          editable={editable}
          {...props}
        />

        {/* Left Icon - Absolutely positioned like the HTML example */}
        {startIcon && (
          <View
            className={cn(
              'pointer-events-none absolute inset-y-0 flex items-center justify-center  text-muted-foreground/80 peer-disabled:opacity-50',
              isRTL ? 'start-0 ps-3' : 'end-0 pe-3'
            )}
            pointerEvents="none">
            <Pressable
              onPress={onStartIconPress}
              disabled={!onStartIconPress || !editable}
              className={cn(!editable && 'opacity-50')}>
              {startIcon}
            </Pressable>
          </View>
        )}

        {/* Right Icon - Absolutely positioned */}
        {endIcon && (
          <View
            className={cn(
              'pointer-events-none absolute inset-y-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50',
              isRTL ? 'end-0 pe-3' : 'start-0 ps-3'
            )}>
            <Pressable
              onPress={onEndIconPress}
              disabled={!onEndIconPress || !editable}
              className={cn(!editable && 'opacity-50')}>
              {endIcon}
            </Pressable>
          </View>
        )}
      </View>
      {/* Error Message */}
      {error && <ThemedText className="px-2 text-destructive">{error}</ThemedText>}
    </View>
  );
}

export { Input };
