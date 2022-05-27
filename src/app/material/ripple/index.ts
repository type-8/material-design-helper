export { default } from './ripple';
export * from './ripple';
import type { MdRippleProps } from './ripple';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      mdRipple: MdRippleProps | boolean;
    }
  }
}
