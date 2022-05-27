import { Router, useRoutes } from 'solid-app-router';
import type { Component } from 'solid-js';
import Header from './Header';
import { SecondaryHeaderProvider } from './SecondaryHeader';
import { routes } from './router';

const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <Router>
      <SecondaryHeaderProvider>
        <Header />
        <main>
          <Routes />
        </main>
      </SecondaryHeaderProvider>
    </Router>
  );
};

export default App;
