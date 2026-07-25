import { Image as RNImage } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useCssElement } from 'react-native-css';
import Animated from 'react-native-reanimated';

const AnimatedExpoImage = Animated.createAnimatedComponent(RNImage);

export type ImageProps = React.ComponentProps<typeof Image>;
function CSSImage(props: React.ComponentProps<typeof AnimatedExpoImage>) {
  // Remap objectFit style to contentFit property
  const flattened: any = StyleSheet.flatten(props.style as any) || {};
  const { objectFit, objectPosition, ...style } = flattened;

  return (
    <AnimatedExpoImage
      contentFit={objectFit}
      contentPosition={objectPosition}
      {...props}
      source={
        typeof props.source === 'string' ? { uri: props.source } : props.source
      }
      style={style}
    />
  );
}

const Image = (
  props: React.ComponentProps<typeof CSSImage> & {
    className?: string;
  },
) => {
  return useCssElement(CSSImage as any, props, {
    className: 'style',
  });
};
Image.displayName = 'CSS(Image)'; // CSS-enabled Image

export default Image;
