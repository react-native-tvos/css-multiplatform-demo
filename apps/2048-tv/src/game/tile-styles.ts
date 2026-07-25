export interface TileStyle {
  container: string;
  text: string;
}

const EMPTY: TileStyle = { container: 'bg-[#cdc1b4]', text: '' };

const TILE_STYLES: Record<number, TileStyle> = {
  2: { container: 'bg-[#eee4da]', text: 'text-[#776e65]' },
  4: { container: 'bg-[#ede0c8]', text: 'text-[#776e65]' },
  8: { container: 'bg-[#f2b179]', text: 'text-[#f9f6f2]' },
  16: { container: 'bg-[#f59563]', text: 'text-[#f9f6f2]' },
  32: { container: 'bg-[#f67c5f]', text: 'text-[#f9f6f2]' },
  64: { container: 'bg-[#f65e3b]', text: 'text-[#f9f6f2]' },
  128: { container: 'bg-[#edcf72]', text: 'text-[#f9f6f2]' },
  256: { container: 'bg-[#edcc61]', text: 'text-[#f9f6f2]' },
  512: { container: 'bg-[#edc850]', text: 'text-[#f9f6f2]' },
  1024: { container: 'bg-[#edc53f]', text: 'text-[#f9f6f2]' },
  2048: { container: 'bg-[#edc22e]', text: 'text-[#f9f6f2]' },
};

const SUPER: TileStyle = { container: 'bg-[#3c3a32]', text: 'text-[#f9f6f2]' };

export function tileStyle(value: number): TileStyle {
  if (value === 0) {
    return EMPTY;
  }
  return TILE_STYLES[value] ?? SUPER;
}

/** Shrink the font as the number gets longer so it always fits the cell. */
export function tileFontClass(value: number): string {
  const digits = String(value).length;
  if (digits <= 2) {
    return 'text-[5.5vh]';
  }
  if (digits === 3) {
    return 'text-[4vh]';
  }
  return 'text-[2.8vh]';
}
