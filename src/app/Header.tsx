import { Link, useLocation } from 'solid-app-router';
import { Component, createEffect, createSignal } from 'solid-js';
import styles from './Header.module.scss';
import MdButton from './material/Button';
import MdTab from './material/tabs/Tab';
import MdTabBar from './material/tabs/TabBar';
import type { MDCTabBar } from '@material/tab-bar';


const Header: Component = () => {
  const [tabBar, setTabBar] = createSignal<MDCTabBar>();

  const location = useLocation();

  const routeMatchTokens = [/color-palette/, /approximate-color/];

  createEffect(() => {
    const tabBarRef = tabBar();
    if (!tabBarRef) return;

    const pathname = location.pathname;
    
    const tokensLen = routeMatchTokens.length;
    for (let i = 0; i < tokensLen; i++) {
      if (routeMatchTokens[i].test(pathname)) {
        tabBarRef.activateTab(i);
        return;
      }
    }
  });


  return (
    <header>
      <section class={styles['primary']}>
        <h1 class='mdc-typography--headline6'>Material Design Helper</h1>
      </section>

      <section class={styles['secondary']}>
        <MdTabBar className={styles['tab-bar']} tabBar={setTabBar} >
          <Link class={styles['link']} href="/color-palette">
            <MdTab>Color Palette</MdTab>
          </Link>
          <Link class={styles['link']} href="/approximate-color">
            <MdTab>Approximate Color</MdTab>
          </Link>
        </MdTabBar>

        <div>
          <MdButton variant="icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" aria-hidden="true"><path d="M12,4.81L12,19c-3.31,0-6-2.63-6-5.87c0-1.56,0.62-3.03,1.75-4.14L12,4.81 M12,2L6.35,7.56l0,0C4.9,8.99,4,10.96,4,13.13 C4,17.48,7.58,21,12,21c4.42,0,8-3.52,8-7.87c0-2.17-0.9-4.14-2.35-5.57l0,0L12,2z"/></svg>
          </MdButton>
        </div>
      </section>
    </header>
  );
};

export default Header;
