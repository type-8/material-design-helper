import {
  Location,
  Navigate,
  Navigator,
  Route,
  Router,
  Routes
  } from 'solid-app-router';
import { Component, lazy } from 'solid-js';
import Footer from './Footer';
import Header from './Header';

const ColorPalette = lazy(() => import('./views/ColorPalette'));
const ApproximateColor = lazy(() => import('./views/ApproximateColor'));


const App: Component = () => {

  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path="/color-palette" component={ColorPalette}  />
          <Route path="/approximate-color" component={ApproximateColor} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
