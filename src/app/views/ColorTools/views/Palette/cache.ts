import type { JSX } from 'solid-js';
import type { MaterialPalette } from "../../../../material/palette";

export type PaletteElementCatch = Map<MaterialPalette, JSX.Element>;

export const PALETTE_ELEMENT_CATCH: PaletteElementCatch = new Map();
