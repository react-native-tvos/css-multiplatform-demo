import { GestureResponderEvent, PressableProps } from 'react-native';
import { Pressable } from './css-wrapped-components';

import '@/global.css';
import { ThemedText, ThemedTextType } from '@/components/themed-text';
import { ThemedColorNames } from '@/hooks/use-theme-colors';

export enum ThemedButtonBehavior {
  scaleOnFocusHover = 'scaleOnFocusHover',
  borderOnFocusHover = 'borderOnFocusHover',
  none = 'none',
}

const pressableClassNames: { [key in ThemedButtonBehavior]: string } = {
  /*
    Default behavior:
    This style provides a rounded border on focus and hover, and scales the button when it is active, with a smooth 0.5 second animation.
   */
  borderOnFocusHover:
    'rounded-[2vh] p-[0.5vh] border-[0.25vh] border-(--color-background) ' +
    'transition-all duration-500 ' +
    'focus:border-(--color-text) ' +
    'hover:border-(--color-text) ' +
    'active:scale-(--scale-active)',
  /*
    Alternative behavior:
     This style scales the button when it is focused, hovered, or active, with a smooth 0.5 second animation.
    */
  scaleOnFocusHover:
    'rounded-[2vh] p-[0.5vh] ' +
    'transition-all duration-500 ' +
    'focus:scale-(--scale-focus) ' +
    'hover:scale-(--scale-hover) ' +
    'active:scale-(--scale-active)',
  /* No focus styling, used for tab bar buttons */
  none: 'rounded-[2vh] p-[0.5vh]',
};

/**
 * Themed button component.
 */
export function ThemedButton({
  onPress,
  children,
  className,
  textType,
  textColor,
  additionalTextClassName,
  focusHoverBehavior,
  ...props
}: PressableProps & {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  children: string;
  className?: string;
  textType?: ThemedTextType | undefined;
  textColor?: ThemedColorNames | 'none';
  additionalTextClassName?: string;
  focusHoverBehavior?: ThemedButtonBehavior | undefined;
}) {
  const behavior =
    focusHoverBehavior ?? ThemedButtonBehavior.borderOnFocusHover;
  return (
    <Pressable
      accessible
      accessibilityLabel={children}
      accessibilityRole="button"
      onPress={onPress}
      tvParallaxProperties={{ enabled: false }}
      className={`${pressableClassNames[behavior]} ${className ?? ''}`}
      {...props}
    >
      <ThemedText
        type={textType ?? ThemedTextType.link}
        color={textColor}
        additionalClassName={additionalTextClassName}
      >
        {children}
      </ThemedText>
    </Pressable>
  );
}
