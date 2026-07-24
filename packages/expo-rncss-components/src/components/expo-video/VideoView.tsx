import { VideoViewProps, VideoView as ExpoVideoView } from 'expo-video';
import { useCssElement } from 'react-native-css';

const VideoView = (
  props: VideoViewProps & { className: string; ref: any },
): any => {
  return useCssElement(ExpoVideoView, props, { className: 'style' });
};

VideoView.displayName = 'CSS(VideoView)';

export default VideoView;
