# Color Distance Calculator


## テスト実行環境
`Code Runner`を用いて実行する。  
`typescript`のコードを実行するためには、`npm`に`typescript`をコンパイルするためのライブラリが必要になる。
```bash
npm install -g typescript ts-node
```


## 事前変換
比較に必要なデータを事前に用意しておくことで、処理を軽くすることが可能になる。

「rgbの相対値」・「rbgの相対値からxyzに変換した値」・「rbgの相対値からxyzに変換した値をlabに変換した値」の３つを用意する。

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

