import { Component, onCleanup } from 'solid-js';
import baseStyles from '../../ColorTools.module.scss';
import { ConfigContextProps, getConfigFromLocalStorage, saveConfigFromLocalStorage, useConfig } from '../../Config';

const CONFIG_LOCAL_STORAGE_KEY = 'color-tools/approximate/config';

const INITIAL_CONFIG: ConfigContextProps = {
  categories: ['display', 'action'] as any,
  display: {
    keys: ['shade'] as any,
    shade: {
      label: 'Shade',
      state: false
    }
  },
  action: {
    keys: ['copy'] as any,
    copy: {
      label: 'Copy',
      state: true
    }
  }
};


const ApproximateColor: Component = () => {
  const [config, setConfig] = useConfig();
  setConfig(getConfigFromLocalStorage(CONFIG_LOCAL_STORAGE_KEY) || INITIAL_CONFIG);


  return (
    <div class={`${baseStyles['route-host']}`}>
    </div>
  );
};

export default ApproximateColor;
