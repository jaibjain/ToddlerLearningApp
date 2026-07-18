export const COLORS = {
  background: '#4b05a8',
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFD93D',
  purple: '#A78BFA',
  text: '#d2c2c2',
  white: '#FFFFFF',
};

export const PALETTE = [
  '#FF6B6B', '#4ECDC4', '#FFD93D', '#A78BFA', '#FF9F45', '#6BCB77',
];

// Deterministic-ish color per index so tiles look varied but stable
export function colorForIndex(i) {
  return PALETTE[i % PALETTE.length];
}
