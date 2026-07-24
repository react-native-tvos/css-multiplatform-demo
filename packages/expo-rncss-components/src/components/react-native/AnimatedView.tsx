import React from 'react';
import { useCssElement } from 'react-native-css';
import Animated from 'react-native-reanimated';

// AnimatedView

const AnimatedView = (
  props: React.ComponentProps<typeof Animated.View> & { className?: string },
) => {
  return useCssElement(Animated.View as any, props, { className: 'style' });
};
AnimatedView.displayName = 'CSS(AnimatedView)';

export default AnimatedView;
