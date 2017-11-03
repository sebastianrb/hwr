import React from "react";
import { BrowserRouter, Route, Redirect, Switch, Link, NavLink } from "react-router-dom";
import Details from "../pages/Details";
import User from "../pages/User";
import List from "../pages/List";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>This is the heading</h3>
        <div className="app-content">
          <Switch>
            <Route exact path="/" component={List} />
            <Route path="/detail/:repo" component={Details} />
            <Route path="/user/:name" component={User} />
          </Switch>
        </div>
        <h3>This is the footer</h3>
      </div>
    );
  }
}
