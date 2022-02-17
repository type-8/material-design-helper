export class RoutePath {
  readonly regExps: RegExp[];
  readonly length: number;

  constructor(
    public readonly names: string[],
    public readonly labels: string[]
  ) {
    const length = this.length = names.length;

    const regExps = this.regExps = [] as RegExp[];
    for (let i = 0; i < length; i++) {
      regExps.push(new RegExp(names[i]));
    }
  }
}
