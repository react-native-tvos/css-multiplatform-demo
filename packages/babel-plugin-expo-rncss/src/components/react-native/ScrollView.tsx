import React from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { useCssElement } from 'react-native-css';

// ScrollView

const ScrollView = (
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

export default ScrollView;
