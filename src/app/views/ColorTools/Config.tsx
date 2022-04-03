import {
  Component,
  createContext,
  createSignal,
  Signal,
  useContext
  } from 'solid-js';


export type ConfigContextProps = {
  key: string;
  version: string;
  statesOrders: [string, string[]][];
  states: {
    [categories: string]: {
      [key: string]: boolean;
    }
  }
}


const ConfigContext = createContext<Signal<ConfigContextProps>>();
export const useConfig = (): Signal<ConfigContextProps> => useContext(ConfigContext) as any;

export const ConfigProvider: Component = (props) => (
  <ConfigContext.Provider value={createSignal({key:'', version:'', statesOrders:[], states:{}})}>{ props.children }</ConfigContext.Provider>
);


export const CONFIG_VERSION = '1.0';

export function getConfigFromLocalStorage(key: string, initialConfig: ConfigContextProps): ConfigContextProps {
  const JSONConfig = localStorage.getItem(key);

  if (JSONConfig) {
    const config = JSON.parse(JSONConfig);
    return (
      (typeof config === 'object') && (config.version === CONFIG_VERSION)
        ? config
        : saveConfigFromLocalStorage(key, initialConfig)
    );

  } else {
    return initialConfig;
  }
}

export function saveConfigFromLocalStorage(key: string, config: ConfigContextProps): ConfigContextProps {
  localStorage.setItem(key, JSON.stringify(config));
  return config;
}
