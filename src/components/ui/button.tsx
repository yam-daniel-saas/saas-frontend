import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { type GestureResponderEvent, Platform, Pressable, Text as RNText } from 'react-native';
import * as Haptics from 'expo-haptics';

const buttonVariants = cva(
  cn('group shrink-0 flex-row items-center justify-center gap-2 rounded-md shadow-none'),
  {
    variants: {
      variant: {
        default: 'bg-primary active:bg-primary/80 shadow-sm shadow-black/5',
        destructive: 'bg-destructive active:bg-destructive/90  shadow-sm shadow-black/5',
        outline: 'border-border bg-background active:bg-accent border shadow-sm shadow-black/5',
        secondary: 'bg-secondary active:bg-secondary/80 shadow-sm shadow-black/5',
        ghost: 'active:bg-accent',
        link: '',
      },
      size: {
        default: 'h-14 px-4 py-2 rounded-full',
        sm: 'h-9 gap-1.5 rounded-md px-3 ',
        lg: 'h-11 rounded-md px-6 ',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(cn('text-foreground text-base font-medium'), {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'group-active:text-accent-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'group-active:text-accent-foreground',
      link: 'text-primary group-active:underline',
    },
    size: {
      default: 'text-base',
      sm: '',
      lg: '',
      icon: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type CustomButtonProps = {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  impact?: boolean | Haptics.ImpactFeedbackStyle;
  titleClassName?: string;
};

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants> &
  CustomButtonProps;

function Button({
  className,
  variant,
  size,
  children,
  titleClassName,
  impact,
  disabled,
  onPress,
  ...props
}: ButtonProps) {
  const handlePress = (event: GestureResponderEvent) => {
    if (impact && Platform.OS !== 'web') {
      Haptics.impactAsync(impact === true ? Haptics.ImpactFeedbackStyle.Light : impact);
    }
    if (onPress) {
      onPress(event);
    }
  };

  return (
    <Pressable
      className={cn(disabled && 'opacity-50', buttonVariants({ variant, size }), className)}
      role="button"
      onPress={handlePress}
      {...props}>
      {children && (
        <RNText className={cn(buttonTextVariants({ variant, size }), titleClassName)}>
          {children}
        </RNText>
      )}
    </Pressable>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
