import type {
  MaterialColorStatus,
  MaterialPalette,
  MaterialPaletteAccentShades,
  MaterialPaletteLabels, 
  MaterialPaletteSimpleShades
} from '../../../../material/palette';


export type ABC = [number, number, number];

export type Distance ={
  value: number;
  shade: string;
  label: string;
  status: MaterialColorStatus;
};

export type CalcDistances = (
  rgb: ABC,
  palette: MaterialPalette,
  labels: MaterialPaletteLabels,
  simpleShades: MaterialPaletteSimpleShades,
  accentShades: MaterialPaletteAccentShades,
) => Distance[];

export type CalcApproximation = (...distances: Distance[]) => {};

export type ApproximationWorker = Window & typeof globalThis & { calcApproximation: CalcApproximation };

export interface ApproximationWorkerData {
  type: 'rgb-euclidean' | 'xyz-euclidean' | 'lab-euclidean' | 'cie2000';
  color: string;
  palettes: MaterialPalette[];
  simpleShades: MaterialPaletteSimpleShades;
  accentShades: MaterialPaletteAccentShades;
  labels: MaterialPaletteLabels;
  multithread: boolean;
}
