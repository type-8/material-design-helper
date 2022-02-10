import { MDCRipple, MDCRippleFoundation } from '@material/ripple';
import {
  Component,
  createEffect,
  createSignal,
  JSX,
  onMount
  } from 'solid-js';

export type MdButtonVariant = 'basic' | 'raised' | 'outlined' | 'icon';

export type MdButtonProps = {
  theme?: string;
  variant?: MdButtonVariant;
  ripple?: (ripple: MDCRipple) => void;
} & JSX.IntrinsicElements['button'];


const MdButton: Component<MdButtonProps> = (props) => {
  const { children, className, ...buttonAttr } = props;

  // コンポーネントがレンダリングされた後に代入される
  let element: HTMLButtonElement;
  let ripple: MDCRipple;

  onMount(() => {
    ripple = new MDCRipple(element); // Rippleを生成
    props.ripple?.(ripple); // Rippleのインスタンスを共有
  })


  // ボタンの見た目を変更するための状態変数
  const [hostClassName, setHostClassName] = createSignal<string>();

  // ボタンの見た目をアップデートする
  createEffect(() => {
    setHostClassName(createHostClassName(className, props.variant, props.theme));
  });

  createEffect(() => {
    props.variant === 'icon'
      ? ripple.unbounded = true
      : ripple.unbounded = false
  });


  return (
    <button { ...buttonAttr } class={hostClassName()} ref={element!}>
      <span class='mdc-button__ripple'></span>
      <span class='mdc-button__label'>{children}</span>
    </button>
  )
}
export default MdButton;


/** @description ボタンの見た目を設定する`className`を生成 */
const createHostClassName = (className?: string, variant?: MdButtonVariant, theme?: string): string => {
  let result = 'mdc-button';

  switch (variant) {
    case void 0:
    case 'basic':
      break;
    
    case 'raised':
      result += ' mdc-button--raised';
      break;

    case 'outlined':
      result += ' mdc-button--outlined';
      break;

    case 'icon':
      result += ' mdc-button--icon';
      break;
  }

  if (theme)
    result += ` mdc-${theme}`;

  if (className)
    result += ` ${className}`

  return result;
}