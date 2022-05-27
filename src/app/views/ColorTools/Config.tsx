import {
  createContext,
  createSignal,
  useContext,
} from 'solid-js';
import type {
  Signal,
  FlowComponent,
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
};

const ConfigContext = createContext<Signal<ConfigContextProps>>();
export const useConfig = (): Signal<ConfigContextProps> => useContext(ConfigContext) as any;

export const ConfigProvider: FlowComponent = (props) => (
  <ConfigContext.Provider value={createSignal({
    key: '', version: '', statesOrders: [], states: {},
  })}>{ props.children }</ConfigContext.Provider>
);

export const CONFIG_VERSION = '1.0';

export function getConfigFromLocalStorage(key: string, initialConfig: ConfigContextProps): ConfigContextProps {
  const JSONConfig = localStorage.getItem(key);

  if (JSONConfig) {
    const config = JSON.parse(JSONConfig);

    const saveConfigToLocalStorage = () => {
      localStorage.setItem(key, JSON.stringify(initialConfig));
      return initialConfig;
    };

    return (
      (typeof config === 'object') && (config.version === CONFIG_VERSION)
        ? config
        : saveConfigToLocalStorage()
    );
  }

  return initialConfig;
}
