export const SIZE = 4;
export const WINNING_VALUE = 2048;

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Tile {
  id: number;
  value: number;
  row: number;
  col: number;
}

export interface MoveResult {
  tiles: Tile[];
  gained: number;
  moved: boolean;
}

const VECTORS: Record<Direction, [number, number]> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

function inBounds(row: number, col: number): boolean {
  return row >= 0 && row < SIZE && col >= 0 && col < SIZE;
}

function buildGrid(tiles: Tile[]): (Tile | null)[][] {
  const grid: (Tile | null)[][] = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => null),
  );
  for (const tile of tiles) {
    grid[tile.row][tile.col] = tile;
  }
  return grid;
}

function emptyCells(tiles: Tile[]): Array<[number, number]> {
  const occupied = new Set(tiles.map((tile) => tile.row * SIZE + tile.col));
  const cells: Array<[number, number]> = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!occupied.has(r * SIZE + c)) {
        cells.push([r, c]);
      }
    }
  }
  return cells;
}

/** Add a 2 (90%) or 4 (10%) on a random empty cell as a new tile. */
export function spawnTile(tiles: Tile[], nextId: number): { tiles: Tile[]; nextId: number } {
  const cells = emptyCells(tiles);
  if (cells.length === 0) {
    return { tiles, nextId };
  }
  const [row, col] = cells[Math.floor(Math.random() * cells.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  return { tiles: [...tiles, { id: nextId, value, row, col }], nextId: nextId + 1 };
}

export function initTiles(startId: number): { tiles: Tile[]; nextId: number } {
  const first = spawnTile([], startId);
  return spawnTile(first.tiles, first.nextId);
}

/** Slide and merge tiles in the given direction. Surviving tiles keep their id (so they
 *  animate from their old position); absorbed tiles are dropped. */
export function move(tiles: Tile[], direction: Direction): MoveResult {
  const [dr, dc] = VECTORS[direction];
  const working = tiles.map((tile) => ({ ...tile }));
  const grid = buildGrid(working);
  const rows = dr > 0 ? [3, 2, 1, 0] : [0, 1, 2, 3];
  const cols = dc > 0 ? [3, 2, 1, 0] : [0, 1, 2, 3];
  const mergedIds = new Set<number>();
  let moved = false;
  let gained = 0;

  for (const r of rows) {
    for (const c of cols) {
      const tile = grid[r][c];
      if (!tile) {
        continue;
      }
      let far = { row: r, col: c };
      let beyond = { row: r + dr, col: c + dc };
      while (inBounds(beyond.row, beyond.col) && grid[beyond.row][beyond.col] === null) {
        far = beyond;
        beyond = { row: beyond.row + dr, col: beyond.col + dc };
      }
      const target = inBounds(beyond.row, beyond.col) ? grid[beyond.row][beyond.col] : null;
      if (target && target.value === tile.value && !mergedIds.has(target.id)) {
        grid[r][c] = null;
        grid[beyond.row][beyond.col] = tile;
        tile.row = beyond.row;
        tile.col = beyond.col;
        tile.value *= 2;
        mergedIds.add(tile.id);
        gained += tile.value;
        moved = true;
      } else if (far.row !== r || far.col !== c) {
        grid[r][c] = null;
        grid[far.row][far.col] = tile;
        tile.row = far.row;
        tile.col = far.col;
        moved = true;
      }
    }
  }

  const result = working.filter((tile) => grid[tile.row][tile.col] === tile);
  return { tiles: result, gained, moved };
}

export function hasWon(tiles: Tile[]): boolean {
  return tiles.some((tile) => tile.value >= WINNING_VALUE);
}

export function canMove(tiles: Tile[]): boolean {
  if (tiles.length < SIZE * SIZE) {
    return true;
  }
  const grid = buildGrid(tiles);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const value = grid[r][c]?.value;
      if (c + 1 < SIZE && grid[r][c + 1]?.value === value) {
        return true;
      }
      if (r + 1 < SIZE && grid[r + 1][c]?.value === value) {
        return true;
      }
    }
  }
  return false;
}
