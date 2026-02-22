import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

import WebTabLayout from '@/components/app-tabs.web';
import { useThemeColors } from '@/hooks/use-theme-colors';

export default function TabLayout() {
  const colors = useThemeColors();
  if (Platform.OS === 'android' && Platform.isTV) {
    return <WebTabLayout />;
  }
  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.background}
      tintColor={colors.tabBarBackground}
      iconColor={colors.text}
      badgeTextColor={colors.text}
      labelStyle={{
        default: { color: colors.text },
        selected: { color: colors.tabBarBackground },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        {Platform.OS === 'ios' ? <NativeTabs.Trigger.Icon sf="house" /> : null}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tvdemo">
        <NativeTabs.Trigger.Label>
          Focus/hover/active styles
        </NativeTabs.Trigger.Label>
        {Platform.OS === 'ios' ? (
          <NativeTabs.Trigger.Icon sf="tv.fill" />
        ) : null}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="video">
        <NativeTabs.Trigger.Label>Video</NativeTabs.Trigger.Label>
        {Platform.OS === 'ios' ? <NativeTabs.Trigger.Icon sf="video" /> : null}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="legendlistdemo">
        <NativeTabs.Trigger.Label>LegendList</NativeTabs.Trigger.Label>
        {Platform.OS === 'ios' ? (
          <NativeTabs.Trigger.Icon sf="list.bullet" />
        ) : null}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
