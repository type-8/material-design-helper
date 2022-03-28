import {
  MATERIAL_PALETTE_ACCENT_SHADES,
  MATERIAL_PALETTE_LABELS,
  MATERIAL_PALETTE_SHADES,
  MATERIAL_PALETTE_SIMPLE_SHADES,
  MaterialPalette,
  MaterialPaletteKey,
  MaterialPaletteLabels,
  MaterialPaletteShades
  } from '../../../../material/palette';
import { PALETTE_ELEMENT_CACHE } from './cache';
import styles from './Palette.module.scss';
import {
  Index,
  JSX,
} from 'solid-js';




export type SelectColor = (
  key: MaterialPaletteKey,
  label: MaterialPaletteLabels[number],
  shade: MaterialPaletteShades[number],
  color: string,
  event: Event
) => void;

type CreatePaletteElement = (key: MaterialPaletteKey, palette: MaterialPalette, selectColor: SelectColor) => JSX.Element;
/**
 * @description パレットを表示するDOMを生成する。一度生成したDOMは保存され、`ColorTools`Componentが破棄されるまで保持される。
 * @param selectColor 子要素がクリックされたときに発火する
 */
export const createPaletteElement: CreatePaletteElement = (key, palette, selectColor) => {
  const cache = PALETTE_ELEMENT_CACHE;
  let paletteElement = cache.get(key);

  if (!paletteElement) {
    const _selectColor = selectColor.bind(null, key);

    paletteElement = (
      <div class={styles.palette}>
        <div class={`${styles.key} cvt-${key}-primary`}>{ key }</div>

        <Index each={MATERIAL_PALETTE_SHADES}>{(shade) => <div class={styles.label}>{shade}</div>}</Index>

        <Index each={MATERIAL_PALETTE_LABELS}>{(_label) => {
          const label = _label();
          const colorRef = palette[label];

          // <Index>{(shade, index) => createPaletteColor(label, colorRef, _selectColor, shade, index)}</Index> を省略
          const createPaletteColor = createColorElement.bind(null, label, colorRef, _selectColor);

          const accentColorEls = colorRef.A100
            ? <Index each={MATERIAL_PALETTE_ACCENT_SHADES}>{createPaletteColor}</Index>
            : <div class={styles['empty-color']}></div>;


          return (
            <>
              <div class={styles.label}>{ capitalizeLabel(label) }</div>
              <Index each={MATERIAL_PALETTE_SIMPLE_SHADES}>{createPaletteColor}</Index>
              { accentColorEls }
            </>
          )
        }}</Index>
      </div>
    );

    cache.set(key, paletteElement);
  }

  return paletteElement;
}


// red => Red
// deepOrange => Deep Orange
function capitalizeLabel(label: string): string {
  return label.replace(/[A-Z]/, (substring) => ' ' + substring);
}



type CreateColorElement = (
  label: MaterialPaletteLabels[number],
  colorRef: MaterialPalette['red'],
  selectColor: (label: MaterialPaletteLabels[number], shade: MaterialPaletteShades[number], color: string, event: Event) => void,
  getShade: () => MaterialPaletteShades[number],
) => JSX.Element;

/** @description `createPaletteElement`内部で使用される関数。色を表すDOMを生成する。 */
const createColorElement: CreateColorElement = (label, colorRef, selectColor, getShade) => {
  const shade = getShade();
  const { color, contrast } = colorRef[shade]!;

  return (
    <div onClick={(event) => selectColor(label, shade, color, event)}
      class={/*@once*/`${styles.color} ${styles[contrast]}`}
      style={/*@once*/`background-color:${color}`}
    >
      {shade}
    </div>
  )
}
