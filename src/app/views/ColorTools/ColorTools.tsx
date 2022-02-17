import { Outlet } from 'solid-app-router';
import { Component, onCleanup, Suspense } from 'solid-js';
import styles from './ColorTools.module.scss';
import ColorViewer from './ColorViewer';
import Header from './Header';
import { PALETTE_ELEMENT_CATCH } from './views/Palette/cache';


const ColorTools: Component = () => {
  onCleanup(() => {
    PALETTE_ELEMENT_CATCH.clear();
  })
  
  return (<>
    <Header />

    <div class={styles.body}>
      <Suspense>
        <Outlet />

        <ColorViewer />
      </Suspense>
    </div>
  </>);
};

export default ColorTools;
