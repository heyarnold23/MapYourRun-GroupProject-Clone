import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/Navigation/NavBar';
import { authenticate } from './store/session';
import HomePage from "./components/HomePage/"
import CreateRoute from "./components/CreateRoute"
import Footer from './components/Footer';
import ActivityFeed from './components/ActivityFeed';
import Social from "./components/Social"

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path = "/">
          <HomePage />
        </Route>
        <Route exact path = "/new-route">
          <CreateRoute />
        </Route>
        <Route exact path = "/activity">
          <ActivityFeed />
        </Route>
        <Route exact path = "/social">

        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
