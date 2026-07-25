import { Text, View } from 'react-native';

function ScoreBox({ label, value }: { label: string; value: number }) {
  return (
    <View className="min-w-[15vh] items-center rounded-[1.2vh] bg-[#bbada0] px-[2.2vh] py-[0.8vh] dark:bg-[#4a4038]">
      <Text className="text-[1.5vh] font-bold uppercase text-[#eee4da]">{label}</Text>
      <Text className="text-[3vh] font-bold text-white">{value}</Text>
    </View>
  );
}

export function ScoreHeader({ score, best, width }: { score: number; best: number; width: number }) {
  return (
    <View className="flex-row items-center justify-between" style={{ width }}>
      <Text className="text-[7vh] font-bold text-[#776e65] dark:text-[#ede0c8]">2048</Text>
      <View className="flex-row gap-[1.5vh]">
        <ScoreBox label="Score" value={score} />
        <ScoreBox label="Best" value={best} />
      </View>
    </View>
  );
}
