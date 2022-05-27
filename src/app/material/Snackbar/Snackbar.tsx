import type { MDCSnackbarAdapter } from '@material/snackbar';
import { createEffect, Show } from 'solid-js';
import type { Component, JSX } from 'solid-js';
import { Portal } from 'solid-js/web';
import { MdSnackbarCore } from './core';

// Snackbarを重複して表示させないために用いる
let displayedSnackbar: MdSnackbarCore | null = null;

export interface MdSnackbarProps {
  opened: boolean;
  onClose: (opened: false) => void;

  message: JSX.Element;
  action?: JSX.Element;

  config?: Partial<MDCSnackbarAdapter>;
}

const MdSnackbar: Component<MdSnackbarProps> = (props) => {
  let element: HTMLElement | null;
  let snackbar: MdSnackbarCore | null;

  // Snackbarが出現しているときに`props.config`に変更があった場合
  createEffect(() => {
    const { config } = props;
    if (config && snackbar) {
      snackbar.mergeAdapter(config);
    }
  });

  const onClose = () => {
    props.onClose(false);
    element = snackbar = displayedSnackbar = null;
  };

  // `props.opened`が`true`となり、ダイアログを開く処理
  createEffect(() => {
    if (props.opened && element) {
      // 表示済みのSnackbarがあれば削除
      if (displayedSnackbar) displayedSnackbar.destroy();

      snackbar = displayedSnackbar = new MdSnackbarCore(element, props.config);
      snackbar.open();
      snackbar.listen('MDCSnackbar:closed', onClose);
    }
  });

  return (
    <Show when={props.opened}>
      <Portal>
        <aside ref={element!} class="inverted-theme mdc-snackbar">
          <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
            <div class="mdc-snackbar__label" aria-atomic="false">{ props.message }</div>
            <div class="mdc-snackbar__actions" aria-atomic="true" onClick={() => snackbar!.close()}>{ props.action }</div>
          </div>
        </aside>
      </Portal>
    </Show>
  );
};
export default MdSnackbar;
