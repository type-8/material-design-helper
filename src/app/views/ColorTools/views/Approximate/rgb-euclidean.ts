import type { MaterialPalette } from '../../../../material/palette';
import type { ABC, ApproximateResult, CalcApproximation } from './interface.d';

const calcApproximation: CalcApproximation = (() => {
  const max = 1.7320508075688772;

  const calcDistance = (src: ABC, dest: ABC) => {
    const r = src[0] - dest[0];
    const g = src[1] - dest[1];
    const b = src[2] - dest[2]; 

    // √(r^2 + g^2 + b^2) / √3
    return Math.sqrt(r * r + g * g + b * b) / max;
  }

  return (rgb, palette, labels, simpleShades, accentShades) => {
    const result: ApproximateResult = [];
    // 元々rgbなので、変換は不要

    const labelLen = labels.length;
    for (let i = 0; i < labelLen; i++) {
      const label = labels[i];
      const status = {};
      
    }

    return result;
  }
})();
