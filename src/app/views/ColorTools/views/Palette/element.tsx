import { Index, type JSX } from 'solid-js';
import {
  MATERIAL_PALETTE_ACCENT_SHADES,
  MATERIAL_PALETTE_LABELS,
  MATERIAL_PALETTE_SHADES,
  MATERIAL_PALETTE_SIMPLE_SHADES,
  type MaterialPalette,
  type MaterialPaletteKey,
  type MaterialPaletteLabels,
  type MaterialPaletteShades,
} from '../../../../material/palette';
import styles from './Palette.module.scss';
import { PALETTE_ELEMENT_CACHE } from './cache';

export type SelectColor = (
  key: MaterialPaletteKey,
  label: MaterialPaletteLabels[number],
  shade: MaterialPaletteShades[number],
  color: string,
  event: Event
) => void;

type CreateColorElement = (
  label: MaterialPaletteLabels[number],
  colorRef: MaterialPalette['red'],
  selectColor: (label: MaterialPaletteLabels[number], shade: MaterialPaletteShades[number], color: string, event: Event) => void,
  getShade: () => MaterialPaletteShades[number],
) => JSX.Element;

type CreatePaletteElement = (key: MaterialPaletteKey, palette: MaterialPalette, selectColor: SelectColor) => JSX.Element;

// red => Red
// deepOrange => Deep Orange
function capitalizeLabel(label: string): string {
  return label.replace(/[A-Z]/, (substring) => ` ${substring}`);
}

/** @description `createPaletteElement`内部で使用される関数。色を表すDOMを生成する。 */
const createColorElement: CreateColorElement = (label, colorRef, selectColor, getShade) => {
  const shade = getShade();
  const { hex, contrast } = colorRef[shade]!;

  return (
    <div onClick={(event) => selectColor(label, shade, hex, event)}
      class={/* @once */`${styles.color} ${styles[contrast]}`}
      style={/* @once */`background-color:${hex}`}
    >
      {shade}
    </div>
  );
};

/**
 * @description パレットを表示するDOMを生成する。一度生成したDOMは保存され、`ColorTools`Componentが破棄されるまで保持される。
 * @param  selectColor 子要素がクリックされたときに発火する
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
          );
        }}</Index>
      </div>
    );

    cache.set(key, paletteElement);
  }

  return paletteElement;
};
