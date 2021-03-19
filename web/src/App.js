import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
