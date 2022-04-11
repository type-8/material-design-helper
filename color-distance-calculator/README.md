# Color Distance Calculator

## 実行環境
`Code Runner`を用いて実行する。

## 事前変換
比較する前に、データとして、「rgbの相対値」・「rbgの相対値からxyzに変換した値」・「rbgの相対値からxyzに変換した値をlabに変換した値」の３つを用意する。
```ts
interface ColorRef {
  color: string,
  contrast: string,
  rgb: [number, number, number],
  xyz: [number, number, number],
  lab: [number, number, number]
}
```

## RGB

