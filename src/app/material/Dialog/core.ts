import { MDCDialog, MDCDialogAdapter } from '@material/dialog';
import { MergeAdapter, mergeAdapter } from '../utils';

export class MdDialogCore extends MDCDialog {
  mergeAdapter = mergeAdapter.bind(this) as MergeAdapter<MDCDialogAdapter>;

  constructor(element: Element, adopter?: Partial<MDCDialogAdapter>) {
    super(element);

    const foundation = this.foundation; // @ts-ignore
    const defaultAdopter = foundation.adapter as MDCDialogAdapter;
    defaultAdopter.addBodyClass = () => void 0;


    if (adopter) {
      this.mergeAdapter(adopter);
    }
  }
}
