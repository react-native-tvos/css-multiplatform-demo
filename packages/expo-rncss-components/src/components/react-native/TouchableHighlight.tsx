import React from 'react';
import {
  TouchableHighlight as RNTouchableHighlight,
  StyleSheet,
} from 'react-native';
import { useCssElement } from 'react-native-css';

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

const TouchableHighlight = (
  props: React.ComponentProps<typeof RNTouchableHighlight> & {
    className?: string;
  },
) => {
  return useCssElement(XXTouchableHighlight as any, props, {
    className: 'style',
  });
};
TouchableHighlight.displayName = 'CSS(TouchableHighlight)';

export default TouchableHighlight;
