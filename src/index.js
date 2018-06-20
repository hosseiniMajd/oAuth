import React from "react";
import ReactDOM from "react-dom";
import {browserHistory, IndexRoute, Route, Router} from "react-router";
import App from "./App";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";


ReactDOM.render((
    <Router history={browserHistory}>

        <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="*" component={Login}/>
        </Route>

    </Router>
), document.getElementById('root'));

registerServiceWorker();