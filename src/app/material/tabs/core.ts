import { MDCTabBar, type MDCTabBarAdapter } from '@material/tab-bar';
import { mergeAdapter, type MergeAdapter } from '../utils';

class MdTabBarCore extends MDCTabBar {
  mergeAdapter = mergeAdapter.bind(this) as MergeAdapter<MDCTabBarAdapter>;

  constructor(element: Element, adopter?: Partial<MDCTabBarAdapter>) {
    super(element);

    if (adopter) this.mergeAdapter(adopter);
  }
}

export default MdTabBarCore;
