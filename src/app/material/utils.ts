export type MergeAdapter<T> = (adopter: Partial<T>) => void;
export function mergeAdapter(adapter: object): void { // @ts-ignore
  const foundation = this.foundation;
  foundation.adapter = { ...foundation.adapter, ...adapter };
}
