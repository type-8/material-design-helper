import { Component, For } from 'solid-js';
import MdCheckbox from '../../../material/Checkbox/Checkbox';
import MdDialog, { MdDialogStyles } from '../../../material/Dialog';
import { useConfig } from '../Config';
import styles from './Config.module.scss';


interface Props {
  opened: boolean;
  onClose: (opened: false) => void;
}

const ConfigDialog: Component<Props> = (props) => {
  const [config, setConfig] = useConfig();


  const onChange = (category: string, key: string, label: string, event: Event) => {
    const state = (event.target as HTMLInputElement).checked;

    setConfig((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: { label, state }
      }
    }));
  }


  return (
    <MdDialog opened={props.opened} onClose={props.onClose} config={{ trapFocus: () => void 0 }}>
      <h2 class={MdDialogStyles.title}>Config</h2>
      <div class={`${styles.content} ${MdDialogStyles.content}`}>
        <For each={config().categories}>{(category) => {
          const props = config()[category];

          return (
            <div class={styles.form}>
              <span class={styles.category}>{ category }</span>
              <div>
                <For each={props.keys}>{(key) => {
                  const prop = props[key];

                  return (
                    <MdCheckbox checked={prop.state} onChange={onChange.bind(null, category, key, prop.label)} theme="accent">
                      { prop.label }
                    </MdCheckbox>
                  );
                }}</For>
              </div>
            </div>
          )
        }}</For>
      </div>
    </MdDialog>
  );
}


export default ConfigDialog;
