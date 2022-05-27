import {
  createContext,
  createSignal,
  useContext,
} from 'solid-js';
import type {
  Component,
  JSX,
  Signal,
  FlowProps,
} from 'solid-js';
import type { RoutePath } from './utils';

type SecondaryHeader = {
  routePath: RoutePath;
  rightActions?: JSX.Element;
} | undefined | null;

const SecondaryHeaderContext = createContext<Signal<SecondaryHeader>>();

export const SecondaryHeaderProvider: Component<FlowProps> = (props) => (
  <SecondaryHeaderContext.Provider value={createSignal()}>
    { props.children }
    </SecondaryHeaderContext.Provider>
);

export const useSecondaryHeader = () => useContext(SecondaryHeaderContext)!;
