import { Outlet } from 'solid-app-router';
import { Component, createSignal, onCleanup, Suspense } from 'solid-js';
import rootHeaderStyles from '../../Header.module.scss';
import MdButton from '../../material/Button';
import { useSecondaryHeader } from '../../SecondaryHeader';
import { RoutePath } from '../../utils';
import styles from './ColorTools.module.scss';
import { ColorViewerSignal, PrimaryColorViewerContext, SecondaryColorViewerContext, SelectedColorViewerContext } from './ColorViewer';
import ColorViewer from './ColorViewer/ColorViewer';
import { ConfigProvider } from './Config';
import ConfigDialog from './dialog/Config';
import ExportingDialog from './dialog/Exporting';
import { COLOR_ELEMENT_CACHE, PALETTE_ELEMENT_CACHE } from './views/Palette/cache';



const ColorTools: Component = () => {
  const [hasOpenedConfigDialog, setHasOpenedConfigDialog] = createSignal(false);
  const [hasOpenedExportingDialog, setHasOpenedExportingDialog] = createSignal(false);


  const primaryColorSignal:   ColorViewerSignal = createSignal(null);
  const secondaryColorSignal: ColorViewerSignal = createSignal(null);


  // SecondaryHeader の値をセット
  useSecondaryHeader()[1]({
    routePath: new RoutePath(
      ['palette', 'approximate'],
      ['Palette', 'Approximate'],
      'color-tools'
    ),
    rightActions: <>
      <MdButton
        class={rootHeaderStyles.button}
        onClick={() => setHasOpenedExportingDialog(true)}
        disabled={!primaryColorSignal[0]()}
      >
        Export
      </MdButton>

      <MdButton class={rootHeaderStyles.button} onClick={() => setHasOpenedConfigDialog(true)}>Config</MdButton>
    </>
  });


  onCleanup(() => {
    PALETTE_ELEMENT_CACHE.clear();
    COLOR_ELEMENT_CACHE.clear();
  });


  return (<>
    <div class={styles.body}>
      <ConfigProvider>
        <PrimaryColorViewerContext.Provider value={primaryColorSignal}>
          <SecondaryColorViewerContext.Provider value={secondaryColorSignal}>
            <SelectedColorViewerContext.Provider value={createSignal(primaryColorSignal)}>

              <Suspense>
                <Outlet/>
                <ColorViewer/>
              </Suspense>

              <ExportingDialog opened={hasOpenedExportingDialog()} onClose={setHasOpenedExportingDialog} />

            </SelectedColorViewerContext.Provider>
          </SecondaryColorViewerContext.Provider>
        </PrimaryColorViewerContext.Provider>

        <ConfigDialog opened={hasOpenedConfigDialog()} onClose={setHasOpenedConfigDialog} />
      </ConfigProvider>
    </div>
  </>);
};

export default ColorTools;
