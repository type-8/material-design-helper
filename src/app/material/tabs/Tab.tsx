import type { Component, JSX } from 'solid-js';


export type MdTabBarProps = {
} & JSX.IntrinsicElements['button'];

const MdTab: Component = (props: MdTabBarProps) => {
  const { children, ...attrs } = props;

  return (
    <button {...attrs} class="mdc-tab" role="tab" aria-selected="true" tabindex="0">
      <span class="mdc-tab__content">
        <span class="mdc-tab__text-label">{ children }</span>
      </span>
      <span class="mdc-tab-indicator">
        <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
      </span>
      <span class="mdc-tab__ripple"></span>
    </button>
  );
};

export default MdTab;
