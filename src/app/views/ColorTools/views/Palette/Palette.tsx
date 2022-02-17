import {
  Component,
  createSignal,
  Index,
  JSX,
  Show
  } from 'solid-js';
import {
  MATERIAL_DARKER_PALETTE,
  MATERIAL_DEFAULT_PALETTE,
  MATERIAL_LIGHTER_PALETTE,
  MATERIAL_PALETTE_ACCENT_SHADES,
  MATERIAL_PALETTE_LABELS,
  MATERIAL_PALETTE_SHADES,
  MATERIAL_PALETTE_SIMPLE_SHADES,
  MaterialPalette,
  MaterialPaletteShades
  } from '../../../../material/palette';
import { copyText } from '../../../../utils';
import { PALETTE_ELEMENT_CATCH } from './cache';
import styles from './Palette.module.scss';




interface Config {
  default: boolean;
  lighter: boolean;
  darker: boolean;

  animation: boolean;
  // highlight: boolean;

  shouldCopy: boolean;
  
}

type SelectColor = (color: string, index: number, event: Event) => void;


const ColorPalette: Component = () => {

  const [config, setConfig] =
    createSignal(
      getConfigFromLocalStorage() || {
        default: true,
        lighter: true,
        darker: true,
        animation: false,
        shouldCopy: true,
      }
    );


  let prevColorEl: Element | null;
  const activeColorClassName = styles['active-color'];

  const selectColor: SelectColor = (color, index, event) => {
    if (prevColorEl) {
      prevColorEl.classList.remove(activeColorClassName);
    }

    const colorEl = event.target as Element;
    if (prevColorEl === colorEl) {
      prevColorEl = null;

    } else {
      copyText(color);
      colorEl.classList.add(activeColorClassName);
      prevColorEl = colorEl;
    }
  }

  return (
    <section class={styles.host}>
      <Show when={config().default}>{ createPaletteElement(MATERIAL_DEFAULT_PALETTE, selectColor) }</Show>
      {/* <div>{ createPaletteElement(MATERIAL_LIGHTER_PALETTE) }</div> */}
      {/* <div>{ createPaletteElement(MATERIAL_DARKER_PALETTE) }</div> */}
    </section>
  );
};

export default ColorPalette;


// red => Red
// deepOrange => Deep Orange
function capitalizeLabel(label: string): string {
  return label.replace(/[A-Z]/, (substring) => ' ' + substring);
}


const SHADE_ELEMENTS = <>
  <div class={styles['shade']}></div>
  <Index each={MATERIAL_PALETTE_SHADES}>{(shade) => <div class={styles['shade']}>{shade}</div>}</Index>
</>;


type CreatePaletteElement = (palette: MaterialPalette, selectColor: SelectColor) => JSX.Element;
/**
 * @description パレットを表示するDOMを生成する。一度生成したDOMは保存され、`ColorTools`Componentが破棄されるまで保持される。
 * @param palette
 * @param selectColor 子要素がクリックされたときに発火する
 */
const createPaletteElement: CreatePaletteElement = (palette, selectColor) => {
  const cache = PALETTE_ELEMENT_CATCH;
  let paletteElement = cache.get(palette);

  if (!paletteElement) {
    paletteElement = (
      <div class={styles['palette']}>  
        { SHADE_ELEMENTS }
        <Index each={MATERIAL_PALETTE_LABELS}>{(_label) => {
          const label = _label();
          const colorRef = palette[label];
          const createPaletteColor = createColorElement.bind(null, colorRef, selectColor);

          const accentColorEls = colorRef.A100
            ? <Index each={MATERIAL_PALETTE_ACCENT_SHADES}>{createPaletteColor}</Index>
            : <div class={styles['empty-color']}></div>;

          return (
            <>
              <div class={styles['label']}>{ capitalizeLabel(label) }</div>
              <Index each={MATERIAL_PALETTE_SIMPLE_SHADES}>{createPaletteColor}</Index>
              { accentColorEls }
            </>
          )
        }}</Index>
      </div>
    );
    cache.set(palette, paletteElement);
  }

  return paletteElement;
}


type CreateColorElement = (colorRef: MaterialPalette['red'], selectColor: SelectColor, shade: () => MaterialPaletteShades[number], index: number) => JSX.Element;
/** @description `createPaletteElement`内部で使用される関数。色を表すDOMを生成する。 */
const createColorElement: CreateColorElement = (colorRef, selectColor, _shade, index) => {
  const shade = _shade();
  const { color, contrast } = colorRef[shade]!;

  return (
    <div onClick={(event) => selectColor(color, index, event)}
      class={/*@once*/`${styles['color']} ${styles[contrast]}`}
      style={/*@once*/`background-color:${color}`}
    >
      {shade}
    </div>
  )
}


const CONFIG_LOCAL_STORAGE_KEY = 'color-tools/palette/config';

function getConfigFromLocalStorage(): Config | null {
  const displayConfig = localStorage.getItem(CONFIG_LOCAL_STORAGE_KEY);

  return displayConfig
    ? JSON.parse(displayConfig)
    : null;
}

function setConfigToLocalStorage(config: Config): void {
  localStorage.setItem(CONFIG_LOCAL_STORAGE_KEY, JSON.stringify(config));
}
