import { Image as ExpoImage } from 'expo-image';
import { withUniwind } from 'uniwind';

// className-enabled expo-image. React Native core components already accept
// className under Uniwind, so only third-party components need withUniwind.
const Image = withUniwind(ExpoImage);

export default Image;
