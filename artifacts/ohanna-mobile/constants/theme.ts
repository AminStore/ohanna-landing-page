import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const SP = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  24,
  xxxl: 32,
} as const;

export const BD = {
  thin: 1,
  md:   1.5,
  thick: 2,
} as const;

export const RD = {
  none:   0,
  badge:  2,
  sm:     4,
  circle: 999,
} as const;

export const FS = {
  micro: 8,
  xxs:   9,
  xs:    10,
  sm:    11,
  md:    12,
  base:  13,
  lg:    14,
  xl:    16,
  xxl:   18,
  xxxl:  20,
  h3:    22,
  h2:    24,
  h1:    28,
  hero:  32,
} as const;

export const GRID_PAD = SP.xl;
export const GRID_GAP = SP.md;
export const COL2 = (width - GRID_PAD * 2 - GRID_GAP) / 2;

export const BTN_H = {
  sm: 40,
  md: 48,
  lg: 52,
} as const;

export const CARD_PAD = SP.lg;
export const SECTION_PAD = SP.xl;
export const SECTION_GAP = SP.lg;
