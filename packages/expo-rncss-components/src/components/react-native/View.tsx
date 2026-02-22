import React from 'react';
import { View as RNView } from 'react-native';
import { useCssElement } from 'react-native-css';

// View

export type ViewProps = React.ComponentProps<typeof RNView> & {
  className?: string;
};

const View = (props: ViewProps) => {
  return useCssElement(RNView, props, { className: 'style' });
};
View.displayName = 'CSS(View)';

export default View;
