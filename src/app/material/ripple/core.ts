import { MDCRipple, type MDCRippleAdapter } from '@material/ripple';
import { mergeAdapter } from '../utils';
import type { MergeAdapter } from '../utils';

export class MdRippleCore extends MDCRipple {
  mergeAdapter = mergeAdapter.bind(this) as MergeAdapter<MDCRippleAdapter>;

  constructor(element: Element, adapter?: Partial<MDCRippleAdapter>) {
    super(element);

    if (adapter) { this.mergeAdapter(adapter); }
  }
}

export default MdRippleCore;
