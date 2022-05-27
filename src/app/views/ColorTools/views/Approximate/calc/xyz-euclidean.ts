import {
  calcDistancesFactory, calcEuclideanFactory, rgb2xyz,
} from './common.d';
import type { CalcDistances } from './interface';

/* eslint-disable @typescript-eslint/no-unused-vars */
const calcDistances: CalcDistances = (() => {
  self.importScripts('./common.ts');

  return calcDistancesFactory(rgb2xyz, calcEuclideanFactory(1.7320508075688772));
})();
/* eslint-enable */
