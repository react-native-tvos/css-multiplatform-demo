import React from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { useCssElement } from 'react-native-css';

// TextInput

const TextInput = (
  props: React.ComponentProps<typeof RNTextInput> & { className?: string },
) => {
  return useCssElement(RNTextInput, props, { className: 'style' });
};
TextInput.displayName = 'CSS(TextInput)';

export default TextInput;
