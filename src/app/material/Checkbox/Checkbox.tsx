import type { MDCCheckboxAdapter } from '@material/checkbox';
import type { FlowComponent, JSX } from 'solid-js';
import { createEffect, onMount } from 'solid-js';
import { MdCheckboxCore } from './core';

export interface MdCheckboxProps {
  checked?: boolean;
  onChange?: JSX.EventHandlerUnion<HTMLInputElement, Event>;
  theme?: string;
  config?: Partial<MDCCheckboxAdapter>;
}

let uniqueId = 0;

const MdCheckbox: FlowComponent<MdCheckboxProps> = (props) => {
  const id = `mdc-checkbox-${uniqueId}`;
  uniqueId++;

  let element: HTMLDivElement;
  let checkbox: MdCheckboxCore;

  // Snackbarが出現しているときに`props.config`に変更があった場合
  createEffect(() => {
    const { config } = props;
    if (config && checkbox) {
      checkbox.mergeAdapter(config);
    }
  });

  // `props.opened`が`true`となり、ダイアログを開く処理
  onMount(() => {
    checkbox = new MdCheckboxCore(element, props.config);
  });

  createEffect(() => {
    checkbox.checked = !!props.checked;
  });

  return (
    <div ref={element!} class='mdc-checkbox-wrapper' classList={{ [`mdc-${props.theme}`]: !!props.theme }}>
      <div class="mdc-checkbox">
        <input id={id} class="mdc-checkbox__native-control" type="checkbox" onChange={props.onChange}/>

        <div class="mdc-checkbox__background">
          <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>

        <div class="mdc-checkbox__ripple"></div>
      </div>

      <label for={id} class="mdc-checkbox-label">{ props.children }</label>
    </div>
  );
};

export default MdCheckbox;
