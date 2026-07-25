import { View } from 'react-native';

import { Tile } from '@/components/tile';
import { SIZE } from '@/game/logic';
import type { Tile as TileModel } from '@/game/logic';

// Padding and gap scale with the board so the whole grid is proportional across screen sizes.
const INSET_RATIO = 0.028;

export function Board({ tiles, size }: { tiles: TileModel[]; size: number }) {
  const inset = size * INSET_RATIO;
  const cellSize = (size - 2 * inset - (SIZE - 1) * inset) / SIZE;
  const cells: Array<[number, number]> = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      cells.push([r, c]);
    }
  }

  return (
    <View className="rounded-[2vh] bg-[#bbada0] dark:bg-[#4a4038]" style={{ width: size, height: size }}>
      {cells.map(([r, c]) => (
        <View
          key={`bg-${r}-${c}`}
          className="absolute rounded-[1.2vh] bg-[#cdc1b4] dark:bg-[#5c5148]"
          style={{
            width: cellSize,
            height: cellSize,
            left: inset + c * (cellSize + inset),
            top: inset + r * (cellSize + inset),
          }}
        />
      ))}
      {tiles.map((tile) => (
        <Tile key={tile.id} tile={tile} cellSize={cellSize} gap={inset} padding={inset} />
      ))}
    </View>
  );
}
