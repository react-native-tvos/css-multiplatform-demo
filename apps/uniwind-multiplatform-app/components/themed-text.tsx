import { Text, TextProps } from 'react-native';

import '@/global.css';
import {
  useScreenDimensions,
  ScreenOrientationType,
} from '@/hooks/use-screen-dimensions';
import { ThemedColorNames } from '@/hooks/use-theme-colors';

export enum ThemedTextType {
  title = 'title',
  link = 'link',
  text = 'text',
  small = 'small',
  tiny = 'tiny',
}

const colorStyles: { [key in ThemedColorNames | 'none']: string } = {
  text: 'text-(--color-text)!',
  background: 'text-(--color-background)!',
  tint: 'text-(--color-tint)!',
  green: 'text-(--color-green)!',
  red: 'text-(--color-red)!',
  special: 'text-(--color-special)!',
  tabBarBackground: 'text-(--color-tab-bar-background)!',
  tabBarDefault: 'text-(--color-tab-bar-default)!',
  tabBarSelected: 'text-(--color-tab-bar-selected)!',
  none: '',
};

const themedTextSizes: {
  [key in ScreenOrientationType]: { [key in ThemedTextType]: string };
} = {
  portrait: {
    title: 'text-[5vw]! leading-[6vw]!',
    link: 'text-[5vw]! leading-[6vw]!',
    text: 'text-[5vw]! leading-[6vw]!',
    small: 'text-[4vw]! leading-[5vw]!',
    tiny: 'text-[3vw]! leading-[4vw]!',
  },
  landscape: {
    title: 'text-[4vh]! leading-[6vh]!',
    link: 'text-[4vh]! leading-[6vh]!',
    text: 'text-[4vh]! leading-[6vh]!',
    small: 'text-[3vh]! leading-[5vh]!',
    tiny: 'text-[2vh]! leading-[4vh]!',
  },
};

export function ThemedText(
  props: TextProps & {
    type?: ThemedTextType | undefined;
    color?: ThemedColorNames | 'none';
    children: string;
    additionalClassName?: string;
    style?: any;
  },
) {
  const { orientation } = useScreenDimensions();
  const type = props?.type ?? 'text';
  const color = props?.color ?? 'text';
  const style = props?.style;
  const sizeClass = themedTextSizes[orientation as ScreenOrientationType][type];
  const colorClass = colorStyles[color];
  const className = `${sizeClass} ${colorClass} ${props?.additionalClassName ?? ''}`;
  return (
    <Text
      style={style}
      className={className}
      accessible
      accessibilityLabel={props?.children}
      accessibilityRole="text"
    >
      {props?.children}
    </Text>
  );
}
