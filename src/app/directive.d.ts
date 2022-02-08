import type { MdRippleProps } from './material/ripple';


export type Directive<P = {}> = (element: Element, accessor: () => P) => void;

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      mdRipple: MdRippleProps | boolean;
    }
  }
}
