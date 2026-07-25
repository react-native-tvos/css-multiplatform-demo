import React from 'react';
import { FlatList as RNFlatList } from 'react-native';
import { useCssElement } from 'react-native-css';

// FlatList

function FlatList<T>(
  props: React.ComponentProps<typeof RNFlatList<T>> & {
    className?: string;
    contentContainerClassName?: string;
  },
) {
  const inputComponent = RNFlatList as any;
  return useCssElement(inputComponent, props, {
    className: 'style',
    contentContainerClassName: 'contentContainerStyle',
  });
}
FlatList.displayName = 'CSS(FlatList)';

export default FlatList;
