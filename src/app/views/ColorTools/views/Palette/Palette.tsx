import baseStyles from '../../ColorTools.module.scss';
import { ColorViewerContextProps, useColorViewer } from '../../ColorViewer';
import { ConfigContextProps, getConfigFromLocalStorage, saveConfigFromLocalStorage, useConfig } from '../../Config';
import CopiedSnackbar, { OpenCopiedSnackbarRef } from '../../snackbar/Copied';
import { COLOR_ELEMENT_CACHE } from './cache';
import { createPaletteElement, SelectColor } from './element';
import styles from './Palette.module.scss';
import {
  Component,
  createEffect,
  observable,
  onCleanup,
  Show,
  } from 'solid-js';
import {
  MaterialPaletteKey,
  MATERIAL_DARKER_PALETTE,
  MATERIAL_DEFAULT_PALETTE,
  MATERIAL_LIGHTER_PALETTE,
  } from '../../../../material/palette';



const CONFIG_LOCAL_STORAGE_KEY = 'color-tools/palette/config';

const INITIAL_CONFIG: ConfigContextProps = {
  categories: ['theme', 'display', 'action'] as any,
  theme: {
    keys: ['default', 'lighter', 'darker'] as any,
    default: {
      label: 'Default',
      state: true
    },
    lighter: {
      label: 'Lighter',
      state: true
    },
    darker: {
      label: 'Darker',
      state: true
    }
  },
  display: {
    keys: ['shade'] as any,
    shade: {
      label: 'Shade',
      state: false
    }
  },
  action: {
    keys: ['copy'] as any,
    copy: {
      label: 'Copy',
      state: true
    }
  }
};


const ColorPalette: Component = () => {
  const [config, setConfig] = useConfig();
  setConfig(getConfigFromLocalStorage(CONFIG_LOCAL_STORAGE_KEY) || INITIAL_CONFIG);


  const openCopiedSnackbar: OpenCopiedSnackbarRef = { ref: null! };

  const selectedColorSignal = useColorViewer.selected()[0];


  // クラスを変数に格納（省略用）
  const activeColorClassName = styles['activated-color'];
  const colorElCache = COLOR_ELEMENT_CACHE;

  const selectColor: SelectColor = (key, label, shade, color, event) => {    
    const colorSignal = selectedColorSignal();

    if (colorSignal) {
      const prevColorEl = colorElCache.get(colorSignal);
      if (prevColorEl)
        prevColorEl.classList.remove(activeColorClassName);
  
      const colorEl = event.target as Element;
  
      if (prevColorEl === colorEl) {
        colorElCache.set(colorSignal, null);
        colorSignal[1](null); // CSSスタイルの削除はEffectのObserverで監視済み
  
      } else {
        colorElCache.set(colorSignal, colorEl);

        // CSSスタイルの追加はEffectのObserverで監視済み
        colorSignal[1]({
          order: createThemeKeyOrder(key),
          label, shade,
          value: {
            default: MATERIAL_DEFAULT_PALETTE[label][shade]!,
            lighter: MATERIAL_LIGHTER_PALETTE[label][shade]!,
            darker:   MATERIAL_DARKER_PALETTE[label][shade]!,
          }
        });
      }

    } else {
      // クリップボードにコピー
      openCopiedSnackbar.ref(color, event);
    }
  }


  // 選択中のパレットが切り替わったとき、または、選択中の色が変更された場合、対応する色の要素を変更する
  createEffect(() => {
    const colorSignal = selectedColorSignal();

    if (colorSignal) {
      // 切り替え時に保存されるデータから色のDOM要素を検索し、それをアクティブ状態の見た目にする
      colorElCache.forEach((el, signal) => {
        if (el) {
          signal === colorSignal
            ? el.classList.add(activeColorClassName)
            : el.classList.remove(activeColorClassName)
        }
      });

      // 選択中のパレットの色が削除される可能性があるので、変更を監視して対応させる
      // (なぜか、unsubscribeをしなくても問題なく動作する（しているように見える）)
      observable(colorSignal[0]).subscribe(color => {
        const colorEl = colorElCache.get(colorSignal);
        if (colorEl) {
          color === null
            ? colorEl?.classList.remove(activeColorClassName)
            : colorEl.classList.add(activeColorClassName);
        }
      });

    } else {
      // パレットがどれも選択されていない場合、すべてのスタイルを削除する
      colorElCache.forEach((el) => el?.classList.remove(activeColorClassName));
    }
  });


  return (
    <div class={`${styles.host} ${baseStyles['route-host']}`} classList={{ [styles['shown-shade']]: config().display.shade.state }}>
      <Show when={config().theme.default.state}>{ createPaletteElement('default', MATERIAL_DEFAULT_PALETTE, selectColor) }</Show>
      <Show when={config().theme.lighter.state}>{ createPaletteElement('lighter', MATERIAL_LIGHTER_PALETTE, selectColor) }</Show>
      <Show when={config().theme.darker.state }>{ createPaletteElement('darker',  MATERIAL_DARKER_PALETTE,  selectColor) }</Show>

      <CopiedSnackbar open={openCopiedSnackbar} />
    </div>
  );
};

export default ColorPalette;


function createThemeKeyOrder(key: MaterialPaletteKey): ColorViewerContextProps['order'] {
  return (
    key === 'lighter'
      ? ['lighter', 'darker', 'default']
      : key === 'darker'
        ? ['darker', 'default', 'lighter']
        : ['default', 'lighter', 'darker']
  )
}
