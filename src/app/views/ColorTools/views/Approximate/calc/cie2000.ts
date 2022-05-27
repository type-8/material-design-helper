import { rgb2lab, calcDistancesFactory } from './common.d';
import type { ABC, CalcDistances } from './interface';

/* eslint-disable @typescript-eslint/no-unused-vars */
const calcDistances: CalcDistances = (() => {
  const { Math } = self;
  self.importScripts('./common.ts');

  const pi2 = 6.283185307179586; // Math.PI * 2

  const n25p7 = 6103515625; // Math.pow(25, 7)

  const hypot = (a: number, b: number) => Math.sqrt(a * a + b * b);

  const pow2 = (a: number) => a * a;

  const pow7 = (a: number) => a * a * a * a * a * a * a;

  function calcDistance(src: ABC, dest: ABC): number {
    const [l1, a1, b1] = src;
    const [l2, a2, b2] = dest;

    const dld = l2 - l1;
    const lb = (l1 + l2) / 2;

    const cs1 = hypot(a1, b1);
    const cs2 = hypot(a2, b2);
    const cb = (cs1 + cs2) / 2;
    const cb7 = pow7(cb);
    const ad1 = a1 + (a1 / 2) * (1 - Math.sqrt(cb7 / (cb7 + n25p7)));
    const ad2 = a2 + (a2 / 2) * (1 - Math.sqrt(cb7 / (cb7 + n25p7)));

    const cd1 = hypot(ad1, b1);
    const cd2 = hypot(ad2, b2);
    const cbd = (cd1 + cd2) / 2;
    const cbd7 = pow7(cbd);

    const dcd = (cd2 - cd1);

    let hd1 = (b1 === 0 && ad1 === 0) ? 0 : Math.atan2(b1, ad1);
    if (hd1 < 0) {
      hd1 += pi2;
    }

    let hd2 = (b2 === 0 && ad2 === 0) ? 0 : Math.atan2(b2, ad2);
    if (hd2 < 0) {
      hd2 += pi2;
    }

    let dhd = hd2 - hd1;
    if ((cd1 * cd2) === 0) {
      dhd = 0;
    } else if (Math.abs(hd1 - hd2) > Math.PI) {
      (hd2 <= hd1)
        ? dhd += pi2
        : dhd -= pi2;
    }

    const dhhd = 2 * Math.sqrt(cd1 * cd2) * Math.sin(dhd / 2);
    let hhbd = 0;
    if ((cd1 * cd2) !== 0) {
      hhbd = (Math.abs(hd1 - hd2) > Math.PI)
        ? (hd1 + hd2 + pi2) / 2
        : (hd1 + hd2) / 2;
    }

    const tt = 1
             - 0.17 * Math.cos(hhbd - 0.5235987755982988/* rad30 */)
             + 0.24 * Math.cos(2 * hhbd)
             + 0.32 * Math.cos(3 * hhbd + 0.10471975511965978/* rad6 */)
             - 0.20 * Math.cos(4 * hhbd - 1.0995574287564276/* rad63 */);

    const lbs50p2 = pow2(lb - 50);
    const ssl = 1 + (0.015 * lbs50p2) / Math.sqrt(20 + lbs50p2);
    const ssc = 1 + 0.045 * cbd;
    const ssh = 1 + 0.015 * cbd * tt;

    // eslint-disable-next-line max-len
    const rrt = -2 * Math.sqrt(cbd7 / (cbd7 + n25p7)) * Math.sin(1.0471975511965976/* rad60 */ * Math.exp(-pow2((hhbd - 4.799655442984406/* rad275 */) / 0.4363323129985824/* rad25 */)));

    const dd = rrt * (dcd / ssc) * (dhhd / ssh)
      + pow2(dld / ssl)
      + pow2(dcd / ssc)
      + pow2(dhhd / ssh);

    return Math.sqrt(dd);
  }

  return calcDistancesFactory(rgb2lab, calcDistance);
})();
/* eslint-enable */
