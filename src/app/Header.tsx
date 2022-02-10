import { Link, useLocation } from 'solid-app-router';
import {
  batch,
  Component,
  createEffect,
  createSelector,
  createSignal,
  For,
  Index,
  on
  } from 'solid-js';
import styles from './Header.module.scss';
import MdButton from './material/Button';
import MdTab from './material/tabs/Tab';
import MdTabBar from './material/tabs/TabBar';
import type { MDCTabBar } from '@material/tab-bar';


const Header: Component = () => {
  // const [tabBar, setTabBar] = createSignal<MDCTabBar>();

  const routePaths = ['/color-tools', '/functions'] as const;
  const routePathLabels = ['Color Tools', 'Functions'] as const;
  const routesPathMatchTokens = routePaths.map(path => new RegExp(path));

  const [isActiveRoutePathIndex, setIsActiveRoutePathIndex] = createSignal<number>(null!);
  
  const test = createSelector(isActiveRoutePathIndex);
  // const routerLinkButtonTheme = (index: number) => isActiveRoutePathIndex() === index ? 'primary' : '';


  const location = useLocation();

  createEffect(() => {
    const pathname = location.pathname;
    
    const tokensLen = routePaths.length;
    for (let i = 0; i < tokensLen; i++) {
      if (routesPathMatchTokens[i].test(pathname)) {
        console.log(i);
        setIsActiveRoutePathIndex(i);
        return;
      }
    }
  });  

  // createEffect(() => {
  //   const tabBarRef = tabBar();
  //   if (!tabBarRef) return;

  //   const pathname = location.pathname;
    
  //   const tokensLen = routeMatchTokens.length;
  //   for (let i = 0; i < tokensLen; i++) {
  //     if (routeMatchTokens[i].test(pathname)) {
  //       tabBarRef.activateTab(i);
  //       return;
  //     }
  //   }
  // });


  const toggleTheme = () => document.body.classList.toggle('dark-theme');


  return (
    <header class={styles['header']}>
      <h1 class='mdc-typography--headline6' className={styles['h1']}>Material Design Helper</h1>

      <div>
        <Index each={routePaths}>{(path, index) => (
          <Link class={`${styles['link']}`} href={path()}>
            <MdButton class={styles['button']} classList={{'mdc-primary': test(index)}}>{ routePathLabels[index] }</MdButton>
          </Link>
        )}</Index>

        <MdButton class={styles['icon-button']} variant="icon" onClick={toggleTheme}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" aria-hidden="true"><path d="M12,4.81L12,19c-3.31,0-6-2.63-6-5.87c0-1.56,0.62-3.03,1.75-4.14L12,4.81 M12,2L6.35,7.56l0,0C4.9,8.99,4,10.96,4,13.13 C4,17.48,7.58,21,12,21c4.42,0,8-3.52,8-7.87c0-2.17-0.9-4.14-2.35-5.57l0,0L12,2z"/></svg>
        </MdButton>

        <a class={styles['icon-button']} href="https://github.com/type-8/material-design-helper" target="_blank" rel="noopener norefferrer">
          <MdButton variant="icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </MdButton>
        </a>
      </div>
      {/* <section class={styles['secondary']}>
        <MdTabBar className={styles['tab-bar']} tabBar={setTabBar} >
          <Link class={styles['link']} href="/color-palette">
            <MdTab>Color Palette</MdTab>
          </Link>
          <Link class={styles['link']} href="/approximate-color">
            <MdTab>Approximate Color</MdTab>
          </Link>
        </MdTabBar>

        <div class={styles['bottom-divider-spacer']}>
          <MdButton class={styles['icon-button']} variant="icon" onClick={toggleTheme}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" aria-hidden="true"><path d="M12,4.81L12,19c-3.31,0-6-2.63-6-5.87c0-1.56,0.62-3.03,1.75-4.14L12,4.81 M12,2L6.35,7.56l0,0C4.9,8.99,4,10.96,4,13.13 C4,17.48,7.58,21,12,21c4.42,0,8-3.52,8-7.87c0-2.17-0.9-4.14-2.35-5.57l0,0L12,2z"/></svg>
          </MdButton>
        </div>
      </section>

      <div class={styles['bottom-divider']}></div> */}
    </header>
  );
};

export default Header;
