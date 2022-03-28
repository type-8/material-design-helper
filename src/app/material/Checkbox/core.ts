import { MDCCheckbox, MDCCheckboxAdapter } from '@material/checkbox';
import { MergeAdapter, mergeAdapter } from '../utils';

export class MdCheckboxCore extends MDCCheckbox {
  mergeAdapter = mergeAdapter.bind(this) as MergeAdapter<MDCCheckboxAdapter>;


  constructor(element: Element, adapter?: Partial<MDCCheckboxAdapter>) {
    super(element);

    if (adapter)
      this.mergeAdapter(adapter)
  }
}
