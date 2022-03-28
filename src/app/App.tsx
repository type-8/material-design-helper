import { Router, useRoutes } from 'solid-app-router';
import { Component } from 'solid-js';
import Header from './Header';
import { routes } from './router';
import { SecondaryHeaderProvider } from './SecondaryHeader';


const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <Router>
      <SecondaryHeaderProvider>
        <Header />

        {/* <main class={styles.main}> */}
        <main>
          <Routes />
        </main>
      </SecondaryHeaderProvider>
    </Router>
  );
};

export default App;
