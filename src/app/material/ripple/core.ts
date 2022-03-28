import { MDCRipple, MDCRippleAdapter } from '@material/ripple';
import { MergeAdapter, mergeAdapter } from '../utils';

export class MdRippleCore extends MDCRipple {
  mergeAdapter = mergeAdapter.bind(this) as MergeAdapter<MDCRippleAdapter>;


  constructor(element: Element, adapter?: Partial<MDCRippleAdapter>) {
    super(element);

    if (adapter)
      this.mergeAdapter(adapter)
  }
}
