import { createContext, Signal, useContext } from 'solid-js';
import {
  MaterialColorStatus,
  MaterialPaletteKey,
  MaterialPaletteKeys,
  MaterialPaletteLabels,
  MaterialPaletteShades
  } from '../../../material/palette';


export type ColorViewerKeys = ['primary', 'secondary'];
export const COLOR_VIEWER_KEYS: ColorViewerKeys = ['primary', 'secondary'];


type PltKeys = MaterialPaletteKeys;
export interface ColorViewerContextProps {
  order: [PltKeys[0], PltKeys[1], PltKeys[2]] | [PltKeys[1], PltKeys[2], PltKeys[0]] | [PltKeys[2], PltKeys[0], PltKeys[1]];
  label: MaterialPaletteLabels[number];
  shade: MaterialPaletteShades[number];
  value: {
    [key in MaterialPaletteKey]: MaterialColorStatus;
  }
}


export type ColorViewerSignal = Signal<ColorViewerContextProps | null>;

export const PrimaryColorViewerContext = createContext<ColorViewerSignal>();
export const SecondaryColorViewerContext = createContext<ColorViewerSignal>();
export const SelectedColorViewerContext = createContext<Signal<ColorViewerSignal | null>>();


export const useColorViewer = {
  primary: () => useContext(PrimaryColorViewerContext)!,
  secondary: () => useContext(SecondaryColorViewerContext)!,
  selected: () => useContext(SelectedColorViewerContext)!,
} as const;
