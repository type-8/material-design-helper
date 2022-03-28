export class RoutePath {
  readonly names: string[];
  readonly regExps: RegExp[];
  readonly length: number;


  constructor(
    names: string[],
    public readonly labels: string[],
    public readonly base?: string
  ) {
    this.names = base
      ? (names = names.map(name => '/' + base + '/' + name))
      : (names = names.map(name => '/' + name));

    const length = this.length = names.length;

    const regExps = this.regExps = [] as RegExp[];
    for (let i = 0; i < length; i++) {
      regExps.push(new RegExp(names[i]));
    }
  }


  checkPathnameMatches(pathname: string, onMatch: (index: number) => void): void {
    const routeLen = this.length;
    const routeRegExps = this.regExps;

    for (let i = 0; i < routeLen; i++) {
      if (routeRegExps[i].test(pathname)) {
        onMatch(i);
        return;
      }
    }
  }
}
