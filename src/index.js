require("./less/index.less");
require("bootstrap-webpack");
require("font-awesome-webpack");

import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";

import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Main from "./pages/Main";

import {requireAuth} from "./util/auth";

const app = document.getElementById("content");

ReactDom.render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout} onEnter={requireAuth}>
            <IndexRoute component={Main}></IndexRoute>
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
    </Router>
, app);
