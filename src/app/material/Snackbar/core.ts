import { MDCSnackbar, MDCSnackbarAdapter } from '@material/snackbar';
import { MergeAdapter, mergeAdapter } from '../utils';

export class MdSnackbarCore extends MDCSnackbar {
  mergeAdapter = mergeAdapter.bind(this) as MergeAdapter<MDCSnackbarAdapter>;


  constructor(element: Element, adapter?: Partial<MDCSnackbarAdapter>) {
    super(element);

    if (adapter)
      this.mergeAdapter(adapter)
  }
}
