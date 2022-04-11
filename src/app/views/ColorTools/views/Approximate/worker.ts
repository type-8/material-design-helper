import type { ApproximationWorker, ApproximationWorkerData } from './interface';



self.addEventListener('message', (event) => {
  const data = event.data as ApproximationWorkerData;

  if (data.multithread) {
    // self.importScripts(script);
    // (self as ApproximationWorker).calcApproximation(_palette, color);

  } else {

  }

  // @ts-ignore
  const dis = calcDistance([1, 0, 0], [64 / 255, 0, 0]);
  self.postMessage(dis);
});
