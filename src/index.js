require("./less/index.less");
require("bootstrap-webpack");
require("font-awesome-webpack");

import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from "react-router";

import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import Main from "./pages/Main";


const app = document.getElementById("content");

ReactDom.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Login}></IndexRoute>
            <Route path="/app" component={Main} />
        </Route>
        <Route path="/register" component={Layout}>
            <IndexRoute component={Register}></IndexRoute>
        </Route>
    </Router>
, app);
