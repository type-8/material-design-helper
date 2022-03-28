import { Component, For, JSX } from 'solid-js';
import MdCheckbox from '../../../material/Checkbox/Checkbox';
import MdDialog, { MdDialogStyles } from '../../../material/Dialog';
import { ConfigContextProp, useConfig } from '../Config';
import styles from './Config.module.scss';


interface Props {
  opened: boolean;
  onClose: (opened: false) => void;
}

const ConfigDialog: Component<Props> = (props) => {
  const [config, setConfig] = useConfig();


  const onChange = (key: string, label: string, event: Event) => {
    const state = (event.target as HTMLInputElement).checked

    setConfig(prev => ({
      ...prev,
      [key]: { state, label }
    }));
  }


  return (
    <MdDialog opened={props.opened} onClose={props.onClose} config={{ trapFocus: () => void 0 }}>
      <h2 class={MdDialogStyles.title}>Export</h2>
      <div class={`${styles.content} ${MdDialogStyles.content}`}>
        <For each={Object.keys(config())}>{(key) => {
          const value = config()[key];
          return (
            <MdCheckbox checked={value.state} onChange={onChange.bind(null, key, value.label)} theme="accent">
              { value.label }
            </MdCheckbox>
          )
        }}</For>
      </div>
    </MdDialog>
  );
}


export default ConfigDialog;
