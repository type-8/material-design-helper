import { MaterialPaletteKey } from '../../../../material/palette';
import { ColorViewerSignal } from '../../ColorViewer';
import type { JSX } from 'solid-js';


export type PaletteElementCache = Map<MaterialPaletteKey, JSX.Element>;
export const PALETTE_ELEMENT_CACHE: PaletteElementCache = new Map();


export type ColorElementCache = Map<ColorViewerSignal, Element | null>;
export const COLOR_ELEMENT_CACHE: ColorElementCache = new Map();
