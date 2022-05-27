import type { MDCRippleAdapter } from '@material/ripple';
import type {
  FlowComponent,
  JSX,
} from 'solid-js';
import {
  createEffect,
  createSignal,
  onMount,
  splitProps,
} from 'solid-js';
import { MdRippleCore } from '../ripple/core';

export type MdButtonVariant = 'basic' | 'raised' | 'outlined' | 'icon';

export type MdButtonProps = {
  theme?: string;
  variant?: MdButtonVariant;
  ripple?: (ripple: MdRippleCore) => void;
  rippleConfig?: Partial<MDCRippleAdapter>;
} & JSX.IntrinsicElements['button'];

/** ボタンの見た目を設定する`className`を生成 */
const createHostClassName = (className?: string, variant?: MdButtonVariant, theme?: string) => {
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

    default:
  }

  if (theme) result += ` mdc-${theme}`;

  if (className) result += ` ${className}`;

  return result;
};

const MdButton: FlowComponent<MdButtonProps> = (props) => {
  const [localProps, attrs] = splitProps(props, ['children']);

  // コンポーネントがレンダリングされた後に代入される
  let element: HTMLButtonElement;
  let ripple: MdRippleCore;

  // Button(ripple)がレンダリングされた後、`props.rippleConfig`に変更があった場合に発火し、変更を加える
  createEffect(() => {
    const config = props.rippleConfig;
    if (config && ripple) {
      ripple.mergeAdapter(config);
    }
  });

  // マウント後、Rippleを生成する
  onMount(() => {
    ripple = new MdRippleCore(element, props.rippleConfig); // Rippleを生成
    props.ripple?.(ripple); // Rippleのインスタンスを共有
  });

  // ボタンがDisabledになったとき、不要なCSSクラスが追加されるため、削除
  createEffect(() => {
    if (props.disabled) {
      ripple.root.classList.remove('mdc-ripple-upgraded--background-focused');
    }
  });

  // ボタンの見た目を変更するための状態変数
  const [hostClassName, setHostClassName] = createSignal<string>();

  // ボタンの見た目をアップデートする
  createEffect(() => {
    setHostClassName(createHostClassName(props.class, props.variant, props.theme));
  });

  // `variant="icon"`のとき、Rippleを中央から出現させる
  createEffect(() => {
    (props.variant === 'icon')
      ? (ripple.unbounded = true)
      : (ripple.unbounded = false);
  });

  return (
    <button { ...attrs } class={hostClassName()} ref={element!}>
      <span class='mdc-button__ripple'></span>
      <span class='mdc-button__label'>{localProps.children}</span>
    </button>
  );
};
export default MdButton;
