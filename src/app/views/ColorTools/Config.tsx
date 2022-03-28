import {
  Component,
  createContext,
  createSignal,
  Signal,
  useContext
  } from 'solid-js';


export interface ConfigContextProp {
  state: boolean;
  label: string;
}

export interface ConfigContextProps {
  [key: string]: ConfigContextProp;
}

const ConfigContext = createContext<Signal<ConfigContextProps>>();
export const useConfig = <T extends ConfigContextProps = ConfigContextProps>(): Signal<T> => useContext(ConfigContext) as any;

export const ConfigProvider: Component = (props) => (
  <ConfigContext.Provider value={createSignal({})}>{ props.children }</ConfigContext.Provider>
);



export function getConfigFromLocalStorage<T extends ConfigContextProps = {}>(key: string): T | null {
  const displayConfig = localStorage.getItem(key);

  return displayConfig
    ? JSON.parse(displayConfig)
    : null;
}

export function saveConfigFromLocalStorage<T extends ConfigContextProps = {}>(key: string, config: T): void {
  localStorage.setItem(key, JSON.stringify(config));
}
