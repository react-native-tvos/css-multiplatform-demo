import React from 'react';
import { useCssElement } from 'react-native-css';
import Animated from 'react-native-reanimated';

const AnimatedText = (
  props: React.ComponentProps<typeof Animated.Text> & { className?: string },
) => {
  return useCssElement(Animated.Text as any, props, { className: 'style' });
};
AnimatedText.displayName = 'CSS(AnimatedText)';

export default AnimatedText;
