import { Component, onCleanup } from 'solid-js';
import baseStyles from '../../ColorTools.module.scss';
import { getConfigFromLocalStorage, saveConfigFromLocalStorage, useConfig } from '../../Config';

const CONFIG_LOCAL_STORAGE_KEY = 'color-tools/approximate/config';

const ApproximateColor: Component = () => {
  const [config, setConfig] = useConfig();
  setConfig(
    getConfigFromLocalStorage(CONFIG_LOCAL_STORAGE_KEY) || {
      shade: {
        state: false,
        label: 'Show Shade'
      },
      copy: {
        state: true,
        label: 'Use Copy'
      }
    }
  );


  onCleanup(() => {
    saveConfigFromLocalStorage(CONFIG_LOCAL_STORAGE_KEY, config());
  });


  return (
    <div class={`${baseStyles['route-host']}`}>
    </div>
  );
};

export default ApproximateColor;
