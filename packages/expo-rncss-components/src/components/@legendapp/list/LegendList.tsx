import { useCssElement } from 'react-native-css';
import {
  LegendListProps,
  LegendList as OriginalLegendList,
} from '@legendapp/list';

const LegendList = (
  props: LegendListProps & { className?: string; ref?: any },
): any => {
  return useCssElement(OriginalLegendList as any, props, {
    className: 'style',
    contentContainerClassName: 'contentContainerStyle',
    indicatorClassName: 'indicatorStyle',
    columnWrapperClassName: 'columnWrapperStyle',
  });
};

LegendList.displayName = 'CSS(LegendList)';

export default LegendList;
