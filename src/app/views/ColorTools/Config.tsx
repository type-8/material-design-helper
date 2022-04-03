import {
  Component,
  createContext,
  createSignal,
  Signal,
  useContext
  } from 'solid-js';


export type ConfigContextProps = {
  // オブジェクトの順番を保証するために必要
  categories: string[] } & {
  [category: string]: ConfigContextProp;
}

export type ConfigContextProp = {
  // オブジェクトの順番を保証するために必要
  keys: string[] } & {
  [key: string]: {
    label: string,
    state: boolean
  }
}


const ConfigContext = createContext<Signal<ConfigContextProps>>();
export const useConfig = (): Signal<ConfigContextProps> => useContext(ConfigContext) as any;

export const ConfigProvider: Component = (props) => (
  <ConfigContext.Provider value={createSignal({categories:[] as any})}>{ props.children }</ConfigContext.Provider>
);



export function getConfigFromLocalStorage(key: string): ConfigContextProps | null {
  const displayConfig = localStorage.getItem(key);

  return displayConfig
    ? JSON.parse(displayConfig)
    : null;
}

export function saveConfigFromLocalStorage(key: string, config: ConfigContextProps): void {
  localStorage.setItem(key, JSON.stringify(config));
}
