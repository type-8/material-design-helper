import { Component, Index } from 'solid-js';
import MdCheckbox from '../../../material/Checkbox/Checkbox';
import MdDialog, { MdDialogStyles } from '../../../material/Dialog';
import { saveConfigFromLocalStorage, useConfig } from '../Config';
import styles from './Config.module.scss';


interface Props {
  opened: boolean;
  onClose: (opened: false) => void;
}

const ConfigDialog: Component<Props> = (props) => {
  const [getConfig, setConfig] = useConfig();


  const onChange = (category: string, key: string, event: Event) => {
    const state = (event.target as HTMLInputElement).checked;
    setConfig((prev) => {
      const config = { ...prev };
      config.states[category][key] = state;
      return config;
    });
  };


  const onClose = (falsy: false) => {
    const config = getConfig();
    saveConfigFromLocalStorage(config.key, config);
    props.onClose(falsy);
  };


  return (
    <MdDialog opened={props.opened} onClose={onClose} config={{ trapFocus: () => void 0 }}>
      <h2 class={MdDialogStyles.title}>Config</h2>
      <div class={`${styles.content} ${MdDialogStyles.content}`}>
        <Index each={getConfig().statesOrders}>{(getOrder) => {
          const config = getConfig();
          const [category, order] = getOrder();

          return (
            <div class={styles.form}>
              <span class={styles.category}>{ category }</span>
              <div>
                <Index each={order}>{(getKey) => {
                  const key = getKey();

                  return (
                    <MdCheckbox checked={config.states[category][key]} onChange={onChange.bind(null, category, key)} theme="accent">
                      { key }
                    </MdCheckbox>
                  );
                }}</Index>
              </div>
            </div>
          )
        }}</Index>
      </div>
    </MdDialog>
  );
}


export default ConfigDialog;
