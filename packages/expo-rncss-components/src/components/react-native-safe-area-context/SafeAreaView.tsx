import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { useCssElement } from 'react-native-css';

// SafeAreaView
const SafeAreaView = (
  props: React.ComponentProps<typeof RNSafeAreaView> & {
    className?: string;
  },
) => {
  return useCssElement(RNSafeAreaView, props, { className: 'style' });
};
SafeAreaView.displayName = 'CSS(SafeAreaView)';

export default SafeAreaView;
