import { Route, Routes } from 'solid-app-router';
import { Component, lazy } from 'solid-js';


const Palette = lazy(() => import('./Palette'));
const Approximate = lazy(() => import('./Approximate'));


const ColorTools: Component = () => {
  return (<>
    <Routes>
      <Route path="/color-palette" component={Palette} />
      <Route path="/approximate-color" component={Approximate} />
    </Routes>
  </>);
};

export default ColorTools;
