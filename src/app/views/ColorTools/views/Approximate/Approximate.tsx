import { Component, onCleanup } from 'solid-js';
import baseStyles from '../../ColorTools.module.scss';
import { CONFIG_VERSION, ConfigContextProps, getConfigFromLocalStorage, useConfig } from '../../Config';
import styles from './Approximate.module.scss';


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


  const calculateColor = (event: SubmitEvent) => {
    event.preventDefault();

    if (SUPPORTED_WORKER) {
      const worker = new window.Worker('./worker.ts');

    } else {

    }

  };

  return (
    <div class={`${baseStyles['route-host']}`}>
      <form class={styles['input-form']} onSubmit={calculateColor}>
        <input class={styles.input}></input>
      </form>
    </div>
  );
};

export default ApproximateColor;
