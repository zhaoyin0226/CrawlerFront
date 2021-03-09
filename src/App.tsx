import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Login from './Pages/Login/Login'
import Home from './Pages/Home/home'
import Show from './Pages/Show/show'

const App: React.FC = () => {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/show" exact component={Show} />
        </Switch>
      </HashRouter>
    </div>
    );
};

export default App;
