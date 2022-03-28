import {
  Component,
  createContext,
  createSignal,
  JSX,
  Signal,
  useContext
  } from 'solid-js';
import { RoutePath } from './utils';

type SecondaryHeader = {
  routePath: RoutePath;
  rightActions?: JSX.Element;
} | undefined | null;


const SecondaryHeaderContext = createContext<Signal<SecondaryHeader>>();

export const SecondaryHeaderProvider: Component = (props) => (
  <SecondaryHeaderContext.Provider value={createSignal()}>{ props.children }</SecondaryHeaderContext.Provider>
);

export const useSecondaryHeader = () => useContext(SecondaryHeaderContext)!;
