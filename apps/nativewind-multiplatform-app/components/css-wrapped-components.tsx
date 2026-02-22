import { useCssElement } from 'react-native-css';
import {
  LegendListProps,
  LegendList as OriginalLegendList,
} from '@legendapp/list';
import { Image as RNImage } from 'expo-image';
import React from 'react';
import {
  FlatList as RNFlatList,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  StyleSheet,
  Text as RNText,
  TextInput as RNTextInput,
  TouchableHighlight as RNTouchableHighlight,
  TouchableOpacity as RNTouchableOpacity,
  View as RNView,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { VideoViewProps, VideoView as ExpoVideoView } from 'expo-video';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

// @legendapp/list

export const LegendList = (
  props: LegendListProps & { className?: string; ref?: any },
): any => {
  return useCssElement(OriginalLegendList as any, props, {
    className: 'style',
    contentContainerClassName: 'contentContainerStyle',
    indicatorClassName: 'indicatorStyle',
    columnWrapperClassName: 'columnWrapperStyle',
  });
};

LegendList.displayName = 'CSS(LegendList)';

// expo-image

const AnimatedExpoImage = Animated.createAnimatedComponent(RNImage);

export type ImageProps = React.ComponentProps<typeof Image>;
function CSSImage(props: React.ComponentProps<typeof AnimatedExpoImage>) {
  // @ts-expect-error: Remap objectFit style to contentFit property
  const { objectFit, objectPosition, ...style } =
    StyleSheet.flatten(props.style) || {};

  return (
    <AnimatedExpoImage
      contentFit={objectFit}
      contentPosition={objectPosition}
      {...props}
      source={
        typeof props.source === 'string' ? { uri: props.source } : props.source
      }
      // @ts-expect-error: Style is remapped above
      style={style}
    />
  );
}

export const Image = (
  props: React.ComponentProps<typeof CSSImage> & {
    className?: string;
  },
) => {
  return useCssElement(CSSImage as any, props, {
    className: 'style',
  });
};
Image.displayName = 'CSS(Image)'; // CSS-enabled Image

// expo-video

export const VideoView = (
  props: VideoViewProps & { className: string; ref: any },
): any => {
  return useCssElement(ExpoVideoView, props, { className: 'style' });
};

VideoView.displayName = 'CSS(VideoView)';

// react-native-safe-area-context

// SafeAreaView
export const SafeAreaView = (
  props: React.ComponentProps<typeof RNSafeAreaView> & {
    className?: string;
  },
) => {
  return useCssElement(RNSafeAreaView, props, { className: 'style' });
};
SafeAreaView.displayName = 'CSS(SafeAreaView)';

// react-native

// AnimatedScrollView

export const AnimatedScrollView = (
  props: React.ComponentProps<typeof Animated.ScrollView> & {
    className?: string;
    contentClassName?: string;
    contentContainerClassName?: string;
  },
) => {
  return useCssElement(Animated.ScrollView as any, props, {
    className: 'style',
    contentClassName: 'contentContainerStyle',
    contentContainerClassName: 'contentContainerStyle',
  });
};
AnimatedScrollView.displayName = 'CSS(AnimatedScrollView)'; // AnimatedText

// AnimatedText

export const AnimatedText = (
  props: React.ComponentProps<typeof Animated.Text> & { className?: string },
) => {
  return useCssElement(Animated.Text as any, props, { className: 'style' });
};
AnimatedText.displayName = 'CSS(AnimatedText)';

// AnimatedView

export const AnimatedView = (
  props: React.ComponentProps<typeof Animated.View> & { className?: string },
) => {
  return useCssElement(Animated.View as any, props, { className: 'style' });
};
AnimatedView.displayName = 'CSS(AnimatedView)';

// FlatList

export function FlatList<T>(
  props: React.ComponentProps<typeof RNFlatList<T>> & {
    className?: string;
    contentContainerClassName?: string;
  },
) {
  const inputComponent = RNFlatList as any;
  return useCssElement(inputComponent, props, {
    className: 'style',
    contentContainerClassName: 'contentContainerStyle',
  });
}
FlatList.displayName = 'CSS(FlatList)';

// Pressable

export const Pressable = (
  props: React.ComponentProps<typeof RNPressable> & { className?: string },
) => {
  return useCssElement(RNPressable as any, props, { className: 'style' });
};
Pressable.displayName = 'CSS(Pressable)';

// ScrollView

export const ScrollView = (
  props: React.ComponentProps<typeof RNScrollView> & {
    className?: string;
    contentContainerClassName?: string;
  },
) => {
  return useCssElement(RNScrollView as any, props, {
    className: 'style',
    contentContainerClassName: 'contentContainerStyle',
  });
};
ScrollView.displayName = 'CSS(ScrollView)';

// Text

export const Text = (
  props: React.ComponentProps<typeof RNText> & { className?: string },
) => {
  return useCssElement(RNText, props, { className: 'style' });
};
Text.displayName = 'CSS(Text)';

// TextInput

export const TextInput = (
  props: React.ComponentProps<typeof RNTextInput> & { className?: string },
) => {
  return useCssElement(RNTextInput, props, { className: 'style' });
};
TextInput.displayName = 'CSS(TextInput)';

function XXTouchableHighlight(
  props: React.ComponentProps<typeof RNTouchableHighlight>,
) {
  const { underlayColor, ...style } =
    (StyleSheet.flatten(props.style) as any) || {};
  return (
    <RNTouchableHighlight
      underlayColor={underlayColor}
      {...props}
      style={style}
    />
  );
}

export const TouchableHighlight = (
  props: React.ComponentProps<typeof RNTouchableHighlight> & {
    className?: string;
  },
) => {
  return useCssElement(XXTouchableHighlight as any, props, {
    className: 'style',
  });
};
TouchableHighlight.displayName = 'CSS(TouchableHighlight)';

// TouchableOpacity

export const TouchableOpacity = (
  props: React.ComponentProps<typeof RNTouchableOpacity> & {
    className?: string;
  },
) => {
  return useCssElement(RNTouchableOpacity as any, props, {
    className: 'style',
  });
};
TouchableOpacity.displayName = 'CSS(TouchableOpacity)';

// View

export type ViewProps = React.ComponentProps<typeof RNView> & {
  className?: string;
};

export const View = (props: ViewProps) => {
  return useCssElement(RNView, props, { className: 'style' });
};
View.displayName = 'CSS(View)';
