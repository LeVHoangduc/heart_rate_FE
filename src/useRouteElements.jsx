// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <Route path="/register" component={RegisterComponent} />
      </Switch>
    </Router>
  );
};

export default App;
