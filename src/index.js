import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { createHashHistory } from 'history';

import Details from "./pages/Details";
import List from "./pages/List";

console.log('React is up and running!');

// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

//insert app onto page
ReactDOM.render(
	<BrowserRouter>
		<div className="app-content">
		    <Switch>
		       <Route path="/react" component={Details}/>
		       <Route path="/" component={List}/>
		    </Switch>
		</div>
	</BrowserRouter>,
    document.getElementById('app')
);
