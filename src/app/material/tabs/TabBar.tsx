import type { MDCTabBarAdapter } from '@material/tab-bar';
import {
  createEffect,
  onMount,
  splitProps,
} from 'solid-js';
import type {
  JSX,
  FlowComponent,
} from 'solid-js';
import MdTabBarCore from './core';

export type MdTabBarProps = {
  theme?: string;
  tabBar?: (tabBar: MdTabBarCore) => void;
  config?: Partial<MDCTabBarAdapter>;
} & JSX.IntrinsicElements['div'];

const createHostClassName = (className?: string, theme?: string): string => {
  let result = 'mdc-tab-bar';

  result += theme
    ? ` mdc-${theme}`
    : ' mdc-primary';

  if (className) result += ` ${className}`;

  return result;
};

const MdTabBar: FlowComponent<MdTabBarProps> = (props) => {
  const [localProps, attrs] = splitProps(props, ['children']);

  let element: HTMLDivElement;
  let tabBar: MdTabBarCore;

  // TabBarがレンダリングされた後、`props.config`に変更があった場合に発火し、変更を加える
  createEffect(() => {
    const { config } = props;
    if (config && tabBar) {
      tabBar.mergeAdapter(config);
    }
  });

  // マウント後、TabBarを生成する
  onMount(() => {
    tabBar = new MdTabBarCore(element); // TabBarを生成
    props.tabBar?.(tabBar); // tabBarのインスタンスを共有
  });

  return (
    <div {...attrs} class={createHostClassName(props.class, props.theme)} role="tablist" ref={element!}>
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
