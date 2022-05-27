import { calcDistances } from './common.d';
import type { WorkerData, Distance } from './interface';

/* eslint-disable @typescript-eslint/no-unused-vars */
self.addEventListener('message', (event) => {
  const data = event.data as WorkerData;
  const {
    palettes, rgb, labels, shades, simpleShades,
  } = data;
  const paletteLen = palettes.length;

  let distances: Distance[] | null = null;

  if (data.multithread) {
    const responses: Promise<Distance[]>[] = [];

    for (let i = 0; paletteLen; i++) {
      const subWorker = new self.Worker('./worker.ts');
      subWorker.postMessage({
        palette: palettes[i], rgb, labels, shades, simpleShades,
      });
      responses.push(new Promise((resolve) => {
        subWorker.addEventListener('message', ({ data }) => resolve(data));
      }));
    }

    Promise.all(responses)
      .then((response) => () => {
        for (let i = 0; i < paletteLen; i++) {
          const result = response[i];

          (distances === null)
            ? distances = result
            : distances.push.apply(result);

          distances!.sort((dis) => dis.value - dis.value);
        }
      });
  } else {
    self.importScripts(`./${data.type}.ts`);

    for (let i = 0; i < paletteLen; i++) {
      const result = calcDistances(palettes[i], rgb, labels, shades, simpleShades);

      (distances === null)
        ? distances = result
        : distances.push.apply(result);
    }

    distances!.sort((dis) => dis.value - dis.value);
    self.postMessage(distances);
  }
});
/* eslint-enable */
