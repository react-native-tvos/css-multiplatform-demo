import type { Direction, Tile } from '@/game/logic';
import { canMove, hasWon, initTiles, move, spawnTile } from '@/game/logic';

export interface GameState {
  tiles: Tile[];
  nextId: number;
  score: number;
  best: number;
  won: boolean;
  over: boolean;
}

export type GameAction = { type: 'move'; direction: Direction } | { type: 'restart' };

export function freshGame(best: number): GameState {
  const { tiles, nextId } = initTiles(0);
  return { tiles, nextId, score: 0, best, won: false, over: false };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'restart') {
    return freshGame(state.best);
  }

  if (state.over) {
    return state;
  }

  const result = move(state.tiles, action.direction);
  if (!result.moved) {
    return state;
  }

  const spawned = spawnTile(result.tiles, state.nextId);
  const score = state.score + result.gained;
  return {
    tiles: spawned.tiles,
    nextId: spawned.nextId,
    score,
    best: Math.max(state.best, score),
    won: state.won || hasWon(spawned.tiles),
    over: !canMove(spawned.tiles),
  };
}
