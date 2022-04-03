import { Component, onCleanup } from 'solid-js';
import baseStyles from '../../ColorTools.module.scss';
import { CONFIG_VERSION, ConfigContextProps, getConfigFromLocalStorage, useConfig } from '../../Config';

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


const ApproximateColor: Component = () => {
  const [config, setConfig] = useConfig();
  setConfig(getConfigFromLocalStorage(CONFIG_LOCAL_STORAGE_KEY, INITIAL_CONFIG));


  return (
    <div class={`${baseStyles['route-host']}`}>
    </div>
  );
};

export default ApproximateColor;
