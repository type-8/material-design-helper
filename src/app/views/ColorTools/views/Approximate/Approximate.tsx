import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import MdButton from '../../../../material/Button';
import MdSnackbar from '../../../../material/Snackbar/Snackbar';
import {
  MATERIAL_DEFAULT_PALETTE,
  MATERIAL_PALETTE_LABELS,
  MATERIAL_PALETTE_SHADES,
  MATERIAL_PALETTE_SIMPLE_SHADES,
} from '../../../../material/palette';
import baseStyles from '../../ColorTools.module.scss';
import {
  CONFIG_VERSION,
  getConfigFromLocalStorage,
  useConfig,
  type ConfigContextProps,
} from '../../Config';
import styles from './Approximate.module.scss';
import type { WorkerData } from './calc/interface';

// import './_update-material-palette';

const CONFIG_LOCAL_STORAGE_KEY = 'color-tools/approximate/config';

const INITIAL_CONFIG: ConfigContextProps = {
  key: CONFIG_LOCAL_STORAGE_KEY,
  version: CONFIG_VERSION,
  statesOrders: [
    ['display', ['shade']],
    ['action', ['copy']],
  ],
  states: {
    display: {
      shade: false,
    },
    action: {
      copy: true,
    },
  },
};

const SUPPORTED_WORKER = !!window.Worker;

const ApproximateColor: Component = () => {
  const [config, setConfig] = useConfig();
  setConfig(getConfigFromLocalStorage(CONFIG_LOCAL_STORAGE_KEY, INITIAL_CONFIG));

  const [hasOpenedAlert, setHasOpenedAlert] = createSignal<boolean | string>(false);

  const calculateColor = (event: SubmitEvent) => {
    event.preventDefault();

    if (SUPPORTED_WORKER) {
      const worker = new Worker(new URL('./calc/worker.ts', import.meta.url));

      worker.postMessage({
        rgb: [255, 235, 238],
        type: 'cie2000',
        palettes: [MATERIAL_DEFAULT_PALETTE],
        labels: MATERIAL_PALETTE_LABELS,
        shades: MATERIAL_PALETTE_SHADES,
        simpleShades: MATERIAL_PALETTE_SIMPLE_SHADES,
        multithread: false,
      } as WorkerData);

      worker.addEventListener('message', (event) => {
        const { data } = event;
        console.log('returned data', data);

        worker.terminate();
      });
    } else {
      setHasOpenedAlert(
        'Approximation Calculator is not supported on your browser',
      );
    }
  };

  return (
    <div class={`${baseStyles['route-host']}`}>
      <form class={styles['input-form']} onSubmit={calculateColor}>
        <input class={styles.input}></input>
      </form>

      <MdSnackbar
        onClose={setHasOpenedAlert}
        opened={!!hasOpenedAlert()}
        message={hasOpenedAlert()}
        action={<MdButton>OK</MdButton>}
      />
    </div>
  );
};

export default ApproximateColor;
