import { Component, createSignal, onCleanup, onMount } from 'solid-js';
import MdButton from '../../../../material/Button';
import { MATERIAL_DEFAULT_PALETTE } from '../../../../material/palette';
import MdSnackbar from '../../../../material/Snackbar/Snackbar';
import baseStyles from '../../ColorTools.module.scss';
import { CONFIG_VERSION, ConfigContextProps, getConfigFromLocalStorage, useConfig } from '../../Config';
import styles from './Approximate.module.scss';
import { ApproximationWorkerData } from './interface';


const CONFIG_LOCAL_STORAGE_KEY = 'color-tools/approximate/config';

const INITIAL_CONFIG: ConfigContextProps = {
  key: CONFIG_LOCAL_STORAGE_KEY,
  version: CONFIG_VERSION,
  statesOrders: [
    ['display', ['shade']],
    ['action', ['copy']]
  ],
  states: {
    display: {
      shade: false
    },
    action: {
      copy: true
    }
  }
};

const SUPPORTED_WORKER = !!window.Worker;


const ApproximateColor: Component = () => {
  const [config, setConfig] = useConfig();
  setConfig(getConfigFromLocalStorage(CONFIG_LOCAL_STORAGE_KEY, INITIAL_CONFIG));

  const [hasOpenedAlert, setHasOpenedAlert] = createSignal<boolean | string>(false);

  const calculateColor = (event: SubmitEvent) => {
    event.preventDefault();

    // if () {
    // }

    if (SUPPORTED_WORKER) {
      const worker = new Worker(new URL('./worker.ts', import.meta.url));

      worker.postMessage({});
      // worker.postMessage({  } as ApproximationWorkerData);

      worker.addEventListener('message', (event) => {
        const data = event.data;
        console.log('returned data', data);

        worker.terminate();
      })


    } else {
      setHasOpenedAlert("Approximation Calculator is not supported on your browser");
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
