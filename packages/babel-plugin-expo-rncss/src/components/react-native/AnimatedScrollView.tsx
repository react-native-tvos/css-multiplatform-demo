import React from 'react';
import { useCssElement } from 'react-native-css';
import Animated from 'react-native-reanimated';

// AnimatedScrollView

const AnimatedScrollView = (
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

export default AnimatedScrollView;
