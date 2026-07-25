import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import type { Tile as TileModel } from '@/game/logic';
import { tileFontClass, tileStyle } from '@/game/tile-styles';

export function Tile({
  tile,
  cellSize,
  gap,
  padding,
}: {
  tile: TileModel;
  cellSize: number;
  gap: number;
  padding: number;
}) {
  const x = padding + tile.col * (cellSize + gap);
  const y = padding + tile.row * (cellSize + gap);
  const [appeared, setAppeared] = useState(false);

  useEffect(() => {
    setAppeared(true);
  }, []);

  const style = tileStyle(tile.value);
  return (
    <View
      className={`absolute items-center justify-center rounded-[1.2vh] transition duration-150 ${style.container} ${appeared ? 'opacity-100' : 'opacity-0'}`}
      style={{
        width: cellSize,
        height: cellSize,
        transform: [{ translateX: x }, { translateY: y }],
      }}
    >
      <Text className={`font-bold ${style.text} ${tileFontClass(tile.value)}`}>
        {tile.value}
      </Text>
    </View>
  );
}
