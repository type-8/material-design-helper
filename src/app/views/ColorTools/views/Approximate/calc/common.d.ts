import type {
  CalcDistancesFactory, ConvertColor, CalcEuclideanFactory, CalcDistance, CalcDistances,
} from './interface.d';

export const calcDistance: CalcDistance;
export const calcDistances: CalcDistances;

export const calcDistancesFactory: CalcDistancesFactory;
export const calcEuclideanFactory: CalcEuclideanFactory;

export const toRate: ConvertColor;
export const rgb2xyz: ConvertColor;
export const xyz2lab: ConvertColor;
export const rgb2lab: ConvertColor;
