import { Image as ExpoImage } from 'expo-image';
import { SafeAreaView as OriginalSafeAreaView } from 'react-native-safe-area-context';
import { LegendList as OriginalLegendList } from '@legendapp/list';
import { withUniwind } from 'uniwind';
import { VideoView as OriginalVideoView } from 'expo-video';

export const Image = withUniwind(ExpoImage);
export const SafeAreaView = withUniwind(OriginalSafeAreaView);
export const LegendList = withUniwind(OriginalLegendList);
export const VideoView = withUniwind(OriginalVideoView);
