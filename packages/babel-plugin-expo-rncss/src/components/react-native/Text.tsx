import React from 'react';
import { Text as RNText } from 'react-native';
import { useCssElement } from 'react-native-css';

// Text

const Text = (
  props: React.ComponentProps<typeof RNText> & { className?: string },
) => {
  return useCssElement(RNText, props, { className: 'style' });
};
Text.displayName = 'CSS(Text)';

export default Text;
