import { vars } from 'nativewind';
import {
  Image,
  View,
  SafeAreaView,
  ScrollView,
} from '@/components/css-wrapped-components';

import '@/global.css';
import { ThemedText, ThemedTextType } from '@/components/themed-text';
import { ThemedButton, ThemedButtonBehavior } from '@/components/themed-button';
import { ThemedLink } from '@/components/themed-link';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { useColorScheme } from 'nativewind';
const customTheme = vars({
  '--light-theme-fg': '#ff0000',
  '--dark-theme-fg': '#00ff00',
});

const imageClassNames: { [key: string]: string } = {
  portrait: 'w-[5vh] h-[5vh]',
  landscape: 'w-[5vw] h-[5vw]',
};

const backgroundClassName = 'bg-(--color-background) flex-1';

const App = () => {
  const { orientation } = useScreenDimensions();
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <View className="flex-1 justify-start items-center bg-(--color-background)">
      <SafeAreaView className={backgroundClassName}>
        <ScrollView
          showsVerticalScrollIndicator
          contentContainerClassName="gap-[1vh] justify-center items-center"
        >
          <ThemedText type={ThemedTextType.title}>Themed Text</ThemedText>
          <ThemedButton onPress={() => {}}>
            Themed Button that adds border on focus/hover (default behavior)
          </ThemedButton>
          <ThemedButton
            onPress={() => {}}
            focusHoverBehavior={ThemedButtonBehavior.scaleOnFocusHover}
          >
            Themed Button that scales on focus/hover
          </ThemedButton>
          <ThemedText>Images with expo-image</ThemedText>
          <View className="w-[90vw] flex-row gap-[5vw]">
            <View className="w-[20vw] justify-center items-center">
              <Image
                source={require('@/assets/images/react-logo.png')}
                className={imageClassNames[orientation]}
              />
              <ThemedText type={ThemedTextType.tiny}>Original</ThemedText>
            </View>
            <View className="flex-1 justify-center items-center">
              <Image
                source={require('@/assets/images/react-logo.png')}
                className={`${imageClassNames[orientation]} translateimage`}
              />
              <ThemedText type={ThemedTextType.tiny}>
                translate-x-[3vw]
              </ThemedText>
            </View>
            <View className="w-[20vw] justify-center items-center">
              <Image
                source={require('@/assets/images/react-logo.png')}
                className={`${imageClassNames[orientation]} scaleimage`}
              />
              <ThemedText type={ThemedTextType.tiny}>scale-x-125</ThemedText>
            </View>
          </View>
          <ThemedText
            style={customTheme}
            color="none"
            additionalClassName="text-(--light-theme-fg)! dark:text-(--dark-theme-fg)!"
          >
            Text with custom CSS variables
          </ThemedText>
          <ThemedText additionalClassName="font-bold!">Bold font</ThemedText>
          <ThemedText additionalClassName="spacemono!">Custom font</ThemedText>
          <ThemedButton
            additionalTextClassName="text-blue-800! dark:text-blue-300!"
            onPress={() =>
              setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
            }
          >
            {`Press to change color scheme (currently ${colorScheme} )`}
          </ThemedButton>
          <ThemedText additionalClassName="animate-bounce!">
            Animations!!!
          </ThemedText>
          <ThemedLink href="/about">About</ThemedLink>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default App;
