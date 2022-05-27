import { calcDistancesFactory, calcEuclideanFactory, rgb2lab } from './common.d';
import type { CalcDistances } from './interface';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const calcDistances: CalcDistances = (() => {
  self.importScripts('./common.ts');

  return (calcDistancesFactory(rgb2lab, calcEuclideanFactory(100)));
})();
/* eslint-enable */
