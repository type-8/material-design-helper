export type MaterialPaletteKeys = ['default', 'lighter', 'darker'];
export type MaterialPaletteKey = MaterialPaletteKeys[number];

export type MaterialPaletteLabels = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
  'brown',
  'grey',
  'blueGrey'
];


export type MaterialPaletteShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A100', 'A200', 'A400', 'A700'];
export type MaterialPaletteSimpleShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
export type MaterialPaletteAccentShades = ['A100', 'A200', 'A400', 'A700'];


export type MaterialPalette = {
  [key in MaterialPaletteLabels[number]]: {
    // 50~A700: [color, text-color];
    [simple in MaterialPaletteSimpleShades[number]]: MaterialColor; } & {
    [accent in MaterialPaletteAccentShades[number]]?: MaterialColor;
  }
}

export type MaterialColor = {
  color: string;
  contrast: 'black' | 'white';
  // データを追加する可能性があるため、オブジェクトとして保存しておく（だた、メモリの消費量がやばそう）
};
