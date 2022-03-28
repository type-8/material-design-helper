import { MDCTabBarAdapter } from '@material/tab-bar';
import {
  Component,
  createEffect,
  JSX,
  onMount,
  splitProps
  } from 'solid-js';
import { MdTabBarCore } from './core';


export type MdTabBarProps = {
  theme?: string;
  tabBar?: (tabBar: MdTabBarCore) => void;
  config?: Partial<MDCTabBarAdapter>;
} & JSX.IntrinsicElements['div'];

const MdTabBar: Component<MdTabBarProps> = (props) => {
  const [localProps, attrs] = splitProps(props, ['children']);

  let element: HTMLDivElement;
  let tabBar: MdTabBarCore;


  // TabBarがレンダリングされた後、`props.config`に変更があった場合に発火し、変更を加える
  createEffect(() => {
    const config = props.config;
    if (config && tabBar) {
      tabBar.mergeAdapter(config)
    }
  });


  // マウント後、TabBarを生成する
  onMount(() => {
    tabBar = new MdTabBarCore(element); // TabBarを生成
    props.tabBar?.(tabBar); // tabBarのインスタンスを共有
  });


  return (
    <div {...attrs} class={createHostClassName(props.class, props.className, props.theme)} role="tablist" ref={element!}>
      <div class="mdc-tab-scroller">
        <div class="mdc-tab-scroller__scroll-area">
          <div class="mdc-tab-scroller__scroll-content">
            { localProps.children }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MdTabBar;


const createHostClassName = (className?: string, className2?: string, theme?: string): string => {
  let result = 'mdc-tab-bar';

  result += theme
    ? ` mdc-${theme}`
    : ' mdc-primary';

  if (className)
    result += ` ${className}`;

  if (className2)
    result += ` ${className2}`;

  return result;
}
