import type {
  CalcDistancesFactory, CalcEuclideanFactory, ConvertColor, Distance,
} from './interface';

/* eslint-disable @typescript-eslint/no-unused-vars */
const calcDistancesFactory: CalcDistancesFactory = (convertColor, calcDistance) => (palette, abc, labels, allShades, simpleShades) => {
  const result: Distance[] = [];

  const srcABC = convertColor(abc);

  const labelLen = labels.length;
  for (let i = 0; i < labelLen; i++) {
    const label = labels[i];
    const statuses = palette[label];

    const shades = (statuses.A100)
      ? allShades
      : simpleShades;

    const shadeLen = shades.length;
    for (let i = 0; i < shadeLen; i++) {
      const shade = shades[i];
      const status = statuses[shade]!;

      result.push({
        label,
        shade,
        status,
        value: calcDistance(srcABC, convertColor(status.rgb)),
      });
    }
  }

  return result;
};

let toRate: ConvertColor;
let rgb2xyz: ConvertColor;
let xyz2lab: ConvertColor;
let rgb2lab: ConvertColor;
(() => {
  const n1d3 = 0.3333333333333333/* 1/3 */;

  const getX = (r: number, g: number, b: number): number => 0.4124 * r + 0.3576 * g + 0.1805 * b;

  const getY = (r: number, g: number, b: number): number => 0.2126 * r + 0.7152 * g + 0.0722 * b;

  const getZ = (r: number, g: number, b: number): number => (0.0193 * r) + (0.1192 * g) + (0.9505 * b);

  const calcTriangle = (t: number): number => ((t > 0.008856451679035631/* Math.pow(6/29, 2) */)
    ? t ** n1d3
    : n1d3 * 23.36111111111111/* 29/6 */ * t + 0.13793103448275862)/* 4/29 */;

  toRate = ([r, g, b]) => [r / 255, g / 255, b / 255];

  rgb2xyz = (rgb) => {
    const [r, g, b] = toRate(rgb);
    return [getX(r, g, b), getY(r, g, b), getZ(r, g, b)];
  };

  xyz2lab = (xyz) => {
    const xxn = calcTriangle(xyz[0] / 0.9505);
    const yyn = calcTriangle(xyz[1]);
    const zzn = calcTriangle(xyz[2] / 1.089);

    return [
      116 * yyn - 16,
      500 * (xxn - yyn),
      200 * (yyn - zzn),
    ];
  };

  rgb2lab = (rgb) => xyz2lab(rgb2xyz(rgb));
})();

const calcEuclideanFactory: CalcEuclideanFactory = (max) => (src, dest) => {
  const r = src[0] - dest[0];
  const g = src[1] - dest[1];
  const b = src[2] - dest[2];

  // √(r^2 + g^2 + b^2) / √3
  return Math.sqrt(r * r + g * g + b * b) / max;
};
/* eslint-enable */
