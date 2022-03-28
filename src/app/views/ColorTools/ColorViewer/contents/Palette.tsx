import { Component, Show } from 'solid-js';
import MdButton from '../../../../material/Button';
import CopiedSnackbar, { OpenCopiedSnackbarRef } from '../../snackbar/Copied';
import { ColorViewerKeys, useColorViewer } from '../Context';
import styles from './Palette.module.scss';


interface PaletteContentProps {
  key: ColorViewerKeys[number]; // static
  disabled?: boolean;
}

const PaletteContent: Component<PaletteContentProps> = (props) => {
  const key = props.key; // static props
  const hostClassName = `cvt-default-${key}-color`;


  const colorSignal = useColorViewer[key]();
  const selectedColorSignalSignal = useColorViewer.selected();

  const [color, setColor] = colorSignal;
  const [selectedColorSignal, setSelectedColorSignal] = selectedColorSignalSignal;

  const hasSelected = () => colorSignal === selectedColorSignal();


  const toggleSelected = () => {
    setSelectedColorSignal(
      hasSelected()
        ? null
        : colorSignal
    );
  };


  const clearColor = (event: Event) => {
    event.stopPropagation(); // 親要素へのイベントの伝播を防ぐ
    setSelectedColorSignal(colorSignal); // このパレットを選択する
    setColor(null); // 色を削除
  }


  const openCopiedSnackbar: OpenCopiedSnackbarRef = { ref: null! };


  return (
    <div
      class={`${styles.host} ${hostClassName}`}
      classList={{[styles.activated]: hasSelected(), [styles.disabled]: props.disabled }}
      onClick={toggleSelected}
    >
      <div class={styles.content}>
        <header class={styles.header}>
          <span class={styles['header-text']}>
            { key }
            <Show when={color()}>{(color) => <span class={styles['header-subtext']}> - { color.label } - { color.shade }</span>}</Show>
          </span>
          <MdButton variant="icon" onClick={clearColor} class={styles['header-action']}>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px"><path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/><path d="M12 6.36c1.53 2 3.08 4.43 3.71 6.24l2.23 2.23c.03-.27.06-.55.06-.83 0-3.98-6-10.8-6-10.8s-1.18 1.35-2.5 3.19l1.44 1.44c.34-.51.7-1 1.06-1.47zM5.41 5.14L4 6.55l3.32 3.32C6.55 11.33 6 12.79 6 14c0 3.31 2.69 6 6 6 1.52 0 2.9-.57 3.95-1.5l2.63 2.63L20 19.72 5.41 5.14zM12 18c-2.21 0-4-1.79-4-4 0-.69.32-1.62.81-2.64l5.72 5.72c-.7.56-1.57.92-2.53.92z"/></svg>
          </MdButton>
        </header>

        <Show when={color()} fallback={createMonoColorElement()}>{({ order, value }) => {
          const [first, second, third] = order;

          return (
            <div class={styles.color}>
              <div class={`${styles['top-color']} cvt-${first}-${key}`} onClick={(event) => openCopiedSnackbar.ref(value[first].color, event)}>
                <span>{ first }</span>
                <span class={styles['color-code']}>{ value[first].color }</span>
              </div>
              <div class={`${styles['bottom-color']} cvt-${second}-${key}`} onClick={(event) => openCopiedSnackbar.ref(value[second].color, event)}>
                <span>{ second }</span>
                <span class={styles['color-code']}>{ value[second].color }</span>
              </div>
              <div class={`${styles['bottom-color']} cvt-${third}-${key}`} onClick={(event) => openCopiedSnackbar.ref(value[third].color, event)}>
                <span>{ third }</span>
                <span class={styles['color-code']}>{ value[third].color }</span>
              </div>
            </div>
          )
        }}</Show>
      </div>

      <div class={styles.overlay}></div>

      <CopiedSnackbar open={openCopiedSnackbar}></CopiedSnackbar>
    </div>
  )
}
export default PaletteContent;


function createMonoColorElement() {
  return (
    <div class={`${styles['color-mono']}`}>
      <div class={`${styles['top-color-mono']}`}></div>
      <div class={`${styles['bottom-color-mono']}`}></div>
      <div class={`${styles['bottom-color-mono']}`}></div>
    </div>
  )
}
