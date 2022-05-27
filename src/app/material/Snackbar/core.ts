import { MDCSnackbar } from '@material/snackbar';
import type { MDCSnackbarAdapter } from '@material/snackbar';
import { mergeAdapter } from '../utils';
import type { MergeAdapter } from '../utils';

export class MdSnackbarCore extends MDCSnackbar {
  mergeAdapter = mergeAdapter.bind(this) as MergeAdapter<MDCSnackbarAdapter>;

  constructor(element: Element, adapter?: Partial<MDCSnackbarAdapter>) {
    super(element);

    if (adapter) { this.mergeAdapter(adapter); }
  }
}
