import { createEffect } from 'solid-js';
import type { Component } from 'solid-js';
import baseStyles from '../ColorTools.module.scss';
import styles from './ColorViewer.module.scss';
import { useColorViewer } from './Context';
import type { ColorViewerContextProps } from './Context';
import Palette from './contents/Palette';
import Preview from './contents/Preview';

type CreateThemeStyleContent = (key: 'primary' | 'secondary', colorCode: ColorViewerContextProps['value']) => string;

/**
 * `ColorViewer`内で共通して用いられるスタイルを生成する。
 * （ちなみに、接頭語の`.cvt`は、`color viewer theme`の略）
 */
const createThemeStyleContent: CreateThemeStyleContent = (key, colorCode) => {
  const def = colorCode.default;
  const lgt = colorCode.lighter;
  const drk = colorCode.darker;

  /*
    .cvt-default-${key} {
      background: ${defColor};
      fill: ${defColor};
      color: ${def.contrast};
    }

    .cvt-default-${key}-color {
      color: ${defColor} !important;
    }

    .cvt-lighter-${key} {
      background: ${lgt.color};
      fill: ${lgt.color};
      color: ${lgt.contrast};
    }

    .cvt-darker-${key} {
      background: ${drk.color};
      fill: ${drk.color};
      color: ${drk.contrast};
    }
   */
  return /* css */`.cvt-default-${key}{background:${def.hex};fill:${def.hex};color:${def.contrast}}.cvt-default-${key}-color{color:${def.hex}!important}.cvt-lighter-${key}{background:${lgt.hex};fill:${lgt.hex};color:${lgt.contrast}}.cvt-darker-${key}{background:${drk.hex};fill:${drk.hex};color:${drk.contrast}}`;
};

/*
  .cvt-default-primary {
    background: var(--mdc-theme-bg-secondary,#f5f5f5);
    fill: var(--mdc-theme-bg-secondary,#f5f5f5);
  }
  
  .cvt-lighter-primary {
    background: var(--mdc-theme-bg-primary,#fafafa);
    fill: var(--mdc-theme-bg-primary,#fafafa);
  }
  
  .cvt-darker-primary {
    background: var(--mdc-theme-bg-tertiary,#e0e0e0);
    fill: var(--mdc-theme-bg-tertiary,#e0e0e0);
  }
*/
const SIMPLE_NORMAL_THEME_STYLE_CONTENT = /* css */'.cvt-default-primary{background:var(--mdc-theme-bg-secondary,#f5f5f5);fill:var(--mdc-theme-bg-secondary,#f5f5f5)}.cvt-lighter-primary{background:var(--mdc-theme-bg-primary,#fafafa);fill:var(--mdc-theme-bg-primary,#fafafa)}.cvt-darker-primary{background:var(--mdc-theme-bg-tertiary,#e0e0e0);fill:var(--mdc-theme-bg-tertiary,#e0e0e0)}';

const ColorViewer: Component = () => {
  const primaryColor = useColorViewer.primary()[0];

  // <style id="color-tools-theme" type="text/css"></style> (index.html)
  const primaryColorStyleElement = document.getElementById('color-tools-primary-theme')!;

  createEffect(() => {
    const color = primaryColor()!;
    primaryColorStyleElement.textContent = color
      ? createThemeStyleContent('primary', color.value)
      : SIMPLE_NORMAL_THEME_STYLE_CONTENT;
  });

  const secondaryColor = useColorViewer.secondary()[0];

  // <style id="color-tools-theme" type="text/css"></style> (index.html)
  const secondaryColorStyleElement = document.getElementById('color-tools-secondary-theme')!;

  createEffect(() => {
    const color = secondaryColor()!;
    secondaryColorStyleElement.textContent = color
      ? createThemeStyleContent('secondary', color.value)
      : '';
  });

  return (
    <div class={`${styles.host} ${baseStyles['color-viewer']}`}>
      <section class={styles.preview} classList={{ 'cvt-mono': !primaryColor() }}>
        <Preview />
      </section>

      <section class={styles.palette}>
        <Palette key="primary" />
        <Palette key="secondary" disabled={!primaryColor()} />
      </section>
    </div>
  );
};

export default ColorViewer;
