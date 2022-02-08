import { MDCTabBar } from '@material/tab-bar';
import { Component, JSX, onMount } from 'solid-js';


export type MdTabBarProps = {
  theme?: string;
  tabBar?: (tabBar: MDCTabBar) => void;
} & JSX.IntrinsicElements['div'];

const MdTabBar: Component<MdTabBarProps> = (props) => {
  const { children, className, ...attrs } = props;

  console.log(className);

  let element: HTMLDivElement;

  onMount(() => {
    const tabBar = new MDCTabBar(element); // tabBarを生成
    props.tabBar?.(tabBar); // tabBarのインスタンスを共有
  });


  return (
    <div {...attrs} class={createHostClassName(className, props.theme)} role="tablist" ref={element!}>
      <div class="mdc-tab-scroller">
        <div class="mdc-tab-scroller__scroll-area">
          <div class="mdc-tab-scroller__scroll-content">
            { children }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MdTabBar;


const createHostClassName = (className?: string, theme?: string): string => {
  let result = 'mdc-tab-bar';

  result += theme
    ? ` mdc-${theme}`
    : ' mdc-primary';

  if (className)
    result += ` ${className}`;

  return result;
}
