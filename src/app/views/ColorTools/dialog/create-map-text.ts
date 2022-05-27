import type { ColorViewerContextProps } from '../ColorViewer';

type ColorRef = ColorViewerContextProps | null;
export type CreateMapText = (primaryColor: ColorRef, secondaryColor: ColorRef) => string;
export type CreateMapTextFactory = (
  createContent: (colorKey: 'primary' | 'secondary', colorRef: NonNullable<ColorRef>) => string,
  head: string,
  divider: string,
  foot: string
) => CreateMapText;

const createMapTextFactory: CreateMapTextFactory = (createContent, head, divider, foot) => (
  (primaryColor, secondaryColor) => (
    (primaryColor && secondaryColor)
      ? head + createContent('primary', primaryColor) + divider + createContent('secondary', secondaryColor) + foot

      : primaryColor
        ? head + createContent('primary', primaryColor) + foot

        : secondaryColor
          ? head + createContent('secondary', secondaryColor) + foot
          : head + foot
  )
);

const rgbToString = ([r, g, b]: [number, number, number]) => `${r}, ${g}, ${b}`;

export const createJSONText = createMapTextFactory(
  (colorKey, { value: { default: def, lighter, darker } }) => (
    `  "${colorKey}": {
    "default": {
      "rgb": [${rgbToString(def.rgb)}],
      "hex": "${def.hex}",
      "contrast": "${def.contrast}"
    },
    "lighter": {
      "rgb": [${rgbToString(lighter.rgb)}],
      "hex": "${lighter.hex}",
      "contrast": "${lighter.contrast}"
    },
    "darker": {
      "rgb": [${rgbToString(darker.rgb)}],
      "hex": "${darker.hex}",
      "contrast": "${darker.contrast}"
    }
  }`),
  '{\n',

  ',\n',

  '\n}',
);

export const createJavaScriptText = createMapTextFactory(
  (colorKey, { value: { default: def, lighter, darker } }) => (
    `  ${colorKey}: {
    default: {
      rgb: [${rgbToString(def.rgb)}],
      hex: '${def.hex}',
      contrast: '${def.contrast}'
    },
    lighter: {
      rgb: [${rgbToString(lighter.rgb)}],
      hex: '${lighter.hex}',
      contrast: '${lighter.contrast}'
    },
    darker: {
      rgb: [${rgbToString(darker.rgb)}],
      hex: '${darker.hex}',
      contrast: '${darker.contrast}'
    }
  }`),
  'const theme = {\n',

  ',\n',

  '\n};',
);

export const createSCSSMapText = createMapTextFactory(
  (colorKey, { value: { default: def, lighter, darker } }) => (
    `  ${colorKey}: (
    default: (
      rgb: (${rgbToString(def.rgb)}),
      hex: ${def.hex},
      contrast: ${def.contrast}
    ),
    lighter: (
      rgb: (${rgbToString(lighter.rgb)}),
      hex: ${lighter.hex},
      contrast: ${lighter.contrast}
    ),
    darker: (
      rgb: (${rgbToString(darker.rgb)}),
      hex: ${darker.hex},
      contrast: ${darker.contrast}
    )
  )`),
  '$theme: (\n',

  ',\n',

  '\n);',
);

export const createSassMapText = createMapTextFactory(
  (colorKey, { value: { default: def, lighter, darker } }) => (`${colorKey}: (default: (rgb: (${rgbToString(def.rgb)}), hex: ${def.hex}, contrast: ${def.contrast}), lighter: (rgb: (${rgbToString(lighter.rgb)}), hex: ${lighter.hex}, contrast: ${lighter.contrast}), darker: (rgb: (${rgbToString(darker.rgb)}), hex: ${darker.hex}, contrast: ${darker.contrast}))`),
  '$theme: (',

  ',',

  ')',
);

export const createLessText = createMapTextFactory(
  (colorKey, { value: { default: def, lighter, darker } }) => (
    `  @${colorKey}: {
    @default: {
      rgb: [${rgbToString(def.rgb)}],
      hex: ${def.hex};
      contrast: ${def.contrast};
    };
    @lighter: {
      rgb: [${rgbToString(lighter.rgb)}],
      hex: ${lighter.hex};
      contrast: ${lighter.contrast};
    };
    @darker: {
      rgb: [${rgbToString(darker.rgb)}],
      hex: ${darker.hex};
      contrast: ${darker.contrast};
    };
  };`),
  '@theme: {\n',

  '\n',

  '\n};',
);
