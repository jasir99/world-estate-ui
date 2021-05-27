import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../components/home/Home';
import Listing from '../components/listing/Listing';
import CreatePost from '../components/createpost/CreatePost';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/listing' component={Listing} />
        <Route path='/create_post' component={CreatePost} />
      </Switch>
    </Router>
  );
}

export default App;
