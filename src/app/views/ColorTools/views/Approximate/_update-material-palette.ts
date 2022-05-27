import {
  MATERIAL_DEFAULT_PALETTE,
  MATERIAL_LIGHTER_PALETTE,
  MATERIAL_DARKER_PALETTE,
  MATERIAL_PALETTE_LABELS,
  MATERIAL_PALETTE_SIMPLE_SHADES,
  MATERIAL_PALETTE_SHADES,
} from '../../../../material/palette';
import type { MaterialPalette } from '../../../../material/palette';
import type { ABC, ConvertColor } from './calc/interface';

let rgb2xyz: ConvertColor;
let xyz2lab: ConvertColor;
let rgb2lab: ConvertColor;

(() => {
  const n1d3 = 0.3333333333333333; /* 1/3 */

  const getX = (r: number, g: number, b: number): number => 0.4124 * r + 0.3576 * g + 0.1805 * b;

  const getY = (r: number, g: number, b: number): number => 0.2126 * r + 0.7152 * g + 0.0722 * b;

  const getZ = (r: number, g: number, b: number): number => 0.0193 * r + 0.1192 * g + 0.9505 * b;

  const calcTriangle = (t: number): number => (
    t > 0.008856451679035631 /* Math.pow(6/29, 2) */
      ? t ** n1d3
      : n1d3 * 23.36111111111111 /* 29/6 */ * t + 0.13793103448275862
  );

  rgb2xyz = ([r, g, b]) => [getX(r, g, b), getY(r, g, b), getZ(r, g, b)];

  const WHITE_XYZ_RATE = rgb2xyz([1, 1, 1]);

  xyz2lab = (xyz) => {
    const wd = WHITE_XYZ_RATE;
    const xxn = calcTriangle(xyz[0] / wd[0]);
    const yyn = calcTriangle(xyz[1] / wd[1]);
    const zzn = calcTriangle(xyz[2] / wd[2]);

    return [116 * yyn - 16, 500 * (xxn - yyn), 200 * (yyn - zzn)];
  };

  rgb2lab = (rgb) => xyz2lab(rgb2xyz(rgb));
})();

function convert(palette: MaterialPalette) {
  const labels = MATERIAL_PALETTE_LABELS;
  const result = {} as any;

  labels.forEach((label) => {
    const statuses = palette[label];
    const shades = statuses.A100
      ? MATERIAL_PALETTE_SHADES
      : MATERIAL_PALETTE_SIMPLE_SHADES;

    const resultStatuses = result[label] || (result[label] = {});

    shades.forEach((shade) => {
      const status = statuses[shade]!;
      const color = status.hex;

      const rgb: ABC = [
        parseInt(color.slice(1, 3), 16),
        parseInt(color.slice(3, 5), 16),
        parseInt(color.slice(5, 7), 16),
      ];

      resultStatuses[shade] = {
        rgb,
        hex: status.hex,
        contrast: status.contrast,
      };
    });
  });

  return result;
}

console.log(/* convert(MATERIAL_DARKER_PALETTE) */);
