export type Directive<P = unknown> = (element: Element, accessor: () => P) => void;
