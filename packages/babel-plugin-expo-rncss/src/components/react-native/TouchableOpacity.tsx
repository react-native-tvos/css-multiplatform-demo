import React from 'react';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';
import { useCssElement } from 'react-native-css';

// TouchableOpacity

const TouchableOpacity = (
  props: React.ComponentProps<typeof RNTouchableOpacity> & {
    className?: string;
  },
) => {
  return useCssElement(RNTouchableOpacity as any, props, {
    className: 'style',
  });
};
TouchableOpacity.displayName = 'CSS(TouchableOpacity)';

export default TouchableOpacity;
