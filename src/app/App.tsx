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
import ColorTools from './views/ColorTools';


const App: Component = () => {

  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path="/color-tools" component={ColorTools} />
          {/* <Route path="/functions" component={Functions} /> */}
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
