import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from './pages/Home';
import { AnimatePresence } from "framer-motion";

function App() {

  return (
    <AnimatePresence>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
    </AnimatePresence>
  );
}

export default App;
