import { useReducer } from 'react';
import { Pressable, Text, useTVEventHandler, useWindowDimensions, View } from 'react-native';

import { Board } from '@/components/board';
import { ScoreHeader } from '@/components/score-header';
import type { Direction } from '@/game/logic';
import { freshGame, gameReducer } from '@/game/state';

const DIRECTIONS: Record<string, Direction> = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
};

export default function GameScreen() {
  const { width, height } = useWindowDimensions();
  // Size the board as a fraction of viewport height (the vh-equivalent the tiles need as a
  // pixel value) so the whole UI scales identically on any 16:9 TV; cap by width for safety.
  const boardSize = Math.round(Math.min(width * 0.9, height * 0.58));
  const [state, dispatch] = useReducer(gameReducer, 0, freshGame);

  useTVEventHandler((evt) => {
    const direction = DIRECTIONS[evt.eventType];
    if (direction) {
      dispatch({ type: 'move', direction });
    } else if (evt.eventType === 'playPause') {
      dispatch({ type: 'restart' });
    }
  });

  return (
    <View className="flex-1 items-center justify-center gap-[3vh] bg-[#faf8ef] dark:bg-[#12100e]">
      <ScoreHeader score={state.score} best={state.best} width={boardSize} />
      <Board tiles={state.tiles} size={boardSize} />

      <View className="h-[7vh] items-center justify-center" style={{ width: boardSize }}>
        {state.over ? (
          <Text className="text-[4vh] font-bold text-[#776e65] dark:text-[#ede0c8]">Game over</Text>
        ) : state.won ? (
          <Text className="text-[4vh] font-bold text-[#f65e3b]">You win! Keep going</Text>
        ) : (
          <Text className="text-[2.6vh] text-[#8f8479] dark:text-[#a89e93]">
            Use the remote arrows / swipes to move
          </Text>
        )}
      </View>

      <Pressable
        onPress={() => dispatch({ type: 'restart' })}
        className="rounded-[1.5vh] bg-[#8f7a66] px-[5vh] py-[2vh] focus:bg-[#a0876d] dark:bg-[#6b5a49] dark:focus:bg-[#83705d]"
      >
        <Text className="text-[3vh] font-bold text-[#f9f6f2]">New game  (play/pause)</Text>
      </Pressable>
    </View>
  );
}
