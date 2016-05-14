/*
 * @author Arwed Mett, Dominic Steinhauser
 * @description This is the main file where all the routing is done.
*/

//Require all dependencies
require("./less/index.less");
require("bootstrap-webpack");
require("font-awesome-webpack");
import "babel-polyfill";

import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Settings from "./pages/Settings";

import {requireAuth} from "./util/auth";
import UserStore from "./stores/UserStore";

const app = document.getElementById("content");

/**
 *  Go to the login if someone logs out.
 */
UserStore.on("change", () => {
    if(!UserStore.authenticated)
        browserHistory.push("/login")
});

ReactDom.render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout} onEnter={requireAuth}>
            <IndexRoute component={Main}></IndexRoute>
			<Route path="/settings" component={Settings} />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
    </Router>
, app);
