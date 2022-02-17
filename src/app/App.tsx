import { Router, useRoutes } from 'solid-app-router';
import { Component } from 'solid-js';
import Footer from './Footer';
import Header from './Header';
import { routes } from './router';


const App: Component = () => {
  const Routes = useRoutes(routes);

  return (
    <Router>
      <Header />

      <main>
        <Routes />
      </main>

      <Footer />
    </Router>
  );
};

export default App;
