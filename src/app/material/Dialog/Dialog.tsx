import type { MDCDialogAdapter } from '@material/dialog';
import type { FlowComponent } from 'solid-js';
import { createEffect, Show } from 'solid-js';
import { Portal } from 'solid-js/web';
import { MdDialogCore } from './core';

// Dialogを重複して表示させないために用いる
let displayedDialog: MdDialogCore | null = null;

export interface MdDialogProps {
  opened: boolean;
  onClose: (opened: false) => void;
  config?: Partial<MDCDialogAdapter>;
}

const MdDialog: FlowComponent<MdDialogProps> = (props) => {
  let element: HTMLDivElement | null;
  let dialog: MdDialogCore | null;

  // Dialogが出現しているときに`props.config`に変更があった場合
  createEffect(() => {
    const { config } = props;
    if (config && dialog) {
      dialog.mergeAdapter(config);
    }
  });

  const onClose = () => {
    props.onClose(false);
    element = dialog = displayedDialog = null;
  };

  // `props.opened`が`true`となり、ダイアログを開く処理
  createEffect(() => {
    if (props.opened && element) {
      // 表示済みのDialogがあれば削除
      if (displayedDialog) displayedDialog.close();

      dialog = displayedDialog = new MdDialogCore(element, props.config);
      dialog.open();
      dialog.listen('MDCDialog:closed', onClose);
    }
  });

  return (
    <Show when={props.opened}>
      <Portal>
        <div ref={element!} class="mdc-dialog">
          <div class="mdc-dialog__container">
            <div class="mdc-dialog__surface" role="alertdialog" aria-modal="true">
              { props.children }
            </div>
          </div>
          <div class="mdc-dialog__scrim"></div>
        </div>
      </Portal>
    </Show>
  );
};
export default MdDialog;

export const MdDialogStyles = {
  title: 'mdc-dialog__title',
  content: 'mdc-dialog__content',
  actions: 'mdc-dialog__actions',
  button: 'mdc-dialog__button',
};
