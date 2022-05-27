import type {
  MaterialColorStatus,
  MaterialPalette,
  MaterialPaletteLabels,
  MaterialPaletteShades,
  MaterialPaletteSimpleShades,
} from '../../../../../material/palette';

export type ABC = [number, number, number];

export type Distance = {
  value: number;
  shade: MaterialPaletteShades[number];
  label: MaterialPaletteLabels[number];
  status: MaterialColorStatus;
};

export type CalcDistance = (src: ABC, dist: ABC) => number;

export type CalcDistances = (
  palette: MaterialPalette,
  abc: ABC,
  labels: MaterialPaletteLabels,
  shades: MaterialPaletteShades,
  simpleShades: MaterialPaletteSimpleShades
) => Distance[];

export type ConvertColor = (rgb: ABC) => ABC;

export type CalcEuclideanFactory = (max: number) => CalcDistance;

export type CalcDistancesFactory = (
  convertColor: ConvertColor,
  calcDistance: CalcDistance,
) => CalcDistances;

export interface WorkerData {
  rgb: ABC,
  type: 'rgb-euclidean' | 'xyz-euclidean' | 'lab-euclidean' | 'cie2000';
  palettes: MaterialPalette[];
  labels: MaterialPaletteLabels;
  shades: MaterialPaletteShades;
  simpleShades: MaterialPaletteSimpleShades;
  multithread: boolean;
}
