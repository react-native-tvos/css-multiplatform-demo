import React from 'react';
import { Pressable as RNPressable } from 'react-native';
import { useCssElement } from 'react-native-css';

// Pressable

const Pressable = (
  props: React.ComponentProps<typeof RNPressable> & { className?: string },
) => {
  return useCssElement(RNPressable as any, props, { className: 'style' });
};
Pressable.displayName = 'CSS(Pressable)';

export default Pressable;
