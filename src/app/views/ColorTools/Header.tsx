import { Link, useLocation } from 'solid-app-router';
import { Component, createEffect, createSignal, Index } from 'solid-js';
import baseStyles from '../../Header.module.scss';
import MdButton from '../../material/Button';
import MdTab from '../../material/tabs/Tab';
import MdTabBar from '../../material/tabs/TabBar';
import { RoutePath } from '../../utils';
import styles from './Header.module.scss';
import type { MDCTabBar } from '@material/tab-bar';


const Header: Component = () => {
  const routePath = new RoutePath(
    ['palette', 'approximate'],
    ['Palette', 'Approximate']
  );

  const [tabBar, setTabBar] = createSignal<MDCTabBar>();

  const location = useLocation();

  createEffect(() => {
    const tabBarRef = tabBar();
    if (!tabBarRef) return;

    const pathname = location.pathname;
    
    const routeLen = routePath.length;
    const routeRegExps = routePath.regExps;

    for (let i = 0; i < routeLen; i++) {
      if (routeRegExps[i].test(pathname)) {
        tabBarRef.activateTab(i);
        return;
      }
    }
  });


  return (<>
    <header class={styles['host']}>
      <MdTabBar className={styles['tab-bar']} tabBar={setTabBar} >
        <Index each={routePath.names}>{(pathname, index) => (
          <Link class={baseStyles['link']} href={pathname()}>
            <MdTab>{ routePath.labels[index] }</MdTab>
          </Link>
        )}</Index>
      </MdTabBar>

      <div class={styles['bottom-divider-spacer']}>
        <MdButton class={baseStyles['button']}>Export</MdButton>
      </div>

      <div class={styles['bottom-divider']}></div>
    </header>
  </>)
}

export default Header;
