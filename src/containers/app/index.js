import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import About from '../about';

import ButtonAppBar from '../Navbar';

const App = () => (
  <div>
    <header>
      <ButtonAppBar />
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
);

export default App;
