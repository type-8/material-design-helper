export type MergeAdapter<T> = (adopter: Partial<T>) => void;

export function mergeAdapter(adapter: object): void {
  /* eslint-disable @typescript-eslint/ban-ts-comment */
  // @ts-ignore
  const foundation = this.foundation as { adapter: object };
  foundation.adapter = { ...foundation.adapter, ...adapter };
  /* eslint-enable @typescript-eslint/ban-ts-comment */
}
