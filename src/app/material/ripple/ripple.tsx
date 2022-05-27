import { MDCRipple } from '@material/ripple';
import { createEffect } from 'solid-js';
import type { Directive } from '../../directive';

export interface MdRippleProps {
  disabled?: boolean;
  theme?: string;
  ripple?: (ripple: MDCRipple) => void;
}

const mdRipple: Directive<MdRippleProps | boolean> = (element, accessor) => {
  const props = accessor();

  const baseClassName = 'mdc-ripple-surface';

  element.classList.add(baseClassName);
  const ripple = new MDCRipple(element);

  if (props !== true && props) {
    props.ripple?.(ripple); // rippleのインスタンスを共有する
  }

  let prevTheme: string | undefined;

  /** Rippleを有効にした際に、`element`変数へスタイルを追加・削除する */
  const activate = (theme?: string) => {
    ripple.activate();

    const { classList } = element;

    if (prevTheme) {
      classList.remove(`${baseClassName}--${prevTheme}`);
    }

    if (theme) {
      classList.add(`${baseClassName}--${theme}`);
    }

    prevTheme = theme;
  };

  // `props`に変更があった場合、それに合わせスタイルを変更する
  createEffect(() => {
    const props = accessor();

    switch (props) {
      case true: {
        activate();
        break;
      }

      case false: {
        ripple.deactivate();
        break;
      }

      default: {
        props.disabled
          ? ripple.deactivate()
          : activate(props.theme);
      }
    }
  });
};

export default mdRipple;
