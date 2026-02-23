import { useWindowDimensions } from 'react-native';

import '@/global.css';
import { ThemedText, ThemedTextType } from '@/components/themed-text';
import { LegendList, SafeAreaView } from '@/components/css-wrapped-components';
import { ThemedButton } from '@/components/themed-button';
import { View } from 'react-native';

const backgroundClassName =
  'bg-(--color-background) w-full h-full justify-center items-center';

const data: number[] = [...Array(100).keys()];

const LegendListDemo: () => React.JSX.Element = () => {
  const { height } = useWindowDimensions();
  return (
    <SafeAreaView className={backgroundClassName}>
      <ThemedText type={ThemedTextType.title}>LegendList</ThemedText>
      <View>
        <LegendList
          className="h-[50vh] w-[20vw]"
          showsScrollIndex={false}
          keyExtractor={(item: any) => `${item}`}
          data={data}
          estimatedItemSize={height * 0.08}
          renderItem={({ item }: { item: number }) => {
            return (
              <View className="justify-center items-center">
                <ThemedButton
                  textType={ThemedTextType.small}
                >{`Block ${item}`}</ThemedButton>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LegendListDemo;
