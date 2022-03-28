import { MDCTabBar, MDCTabBarAdapter } from '@material/tab-bar';
import { MergeAdapter, mergeAdapter } from '../utils';

export class MdTabBarCore extends MDCTabBar {
  mergeAdapter = mergeAdapter.bind(this) as MergeAdapter<MDCTabBarAdapter>;

  constructor(element: Element, adopter?: Partial<MDCTabBarAdapter>) {
    super(element);

    if (adopter) this.mergeAdapter(adopter);
  }
}
