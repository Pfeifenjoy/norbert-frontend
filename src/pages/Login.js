/*
* @author Arwed Mett, Dominic Steinhasuer
*/


import React, { Component } from "react";
import ConfigStore from "../stores/ConfigStore";
import BaseUrlInput from "../components/BaseUrlInput";
import { Link } from "react-router";
import { login } from "../actions/UserActions";
import UserStore from "../stores/UserStore";
let logo = require("../img/logo.png");

/**
 * This is the login page.
 * Provides a form for a user to login.
 */
const Login = React.createClass({

    getInitialState() {
        return {
            config: ConfigStore.getAll(),
            submitFailed: UserStore.authenticationFailed,
            loading: false,
            username: "",
            password: ""
        }
    },

    /**
     * Require the router to navigate to the next page.
     */
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillMount() {
        this.handleConfigUpdate = () => {
            this.setState({ config: ConfigStore.getAll() });
        };
        ConfigStore.on("change", this.handleConfigUpdate);
        this.handleUserUpdate = () => {
            //navigate to the next page if the user is logged in.
            this.setState({
                submitFailed: UserStore.authenticationFailed,
                loading: false,
            })
            if(UserStore.authenticated) {
                const { location } = this.props;
                if(location.state && location.state.nextPathname) {
                    this.context.router.replace(location.state.nextPathname)
                }
                else {
                    this.context.router.replace("/");
                }
            }
        };
        UserStore.on("change", this.handleUserUpdate);
    },
    componentWillUnmount() {
        //clear all listeners, to prevent memory leaks.
        ConfigStore.removeListener("change", this.handleConfigUpdate);
        UserStore.removeListener("change", this.handleUserUpdate);
    },
    render() {

        //check for errors
        const usernameState = "form-group" + (this.state.submitFailed && this.state.username.trim() === "" ? " has-error" : "");

        //username input field
        const username = <div className={usernameState}>
            <input className="form-control" placeholder="Benutzername"
               value={this.state.username}
               onChange={this.handleUsernameChange} name="username"
               disabled={this.state.loading}
               type="text"/>
           </div>;

        //check for errors
        const passwordState = "form-group" + (this.state.submitFailed && this.state.password.length < 10 ? " has-error" : "");

        //password input field
        const password = <div className={passwordState}>
            <input className="form-control" placeholder="Passwort"
               value={this.state.password}
               onChange={this.handlePasswordChange} name="password"
               type="password"
               disabled={this.state.loading}
               />
           </div>;

        //check for errors
        const loginFailed = this.state.submitFailed ? 
           <div className="alert alert-dange">Login failed.</div> : [];
        //render the main form.
        const loginForm = <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">Anmeldung</h3>
            </div>
            <div className="panel-body">
                {loginFailed}
                <form acceptCharset="UTF-8" role="form" action="index.html#/app" method="post"
                      onSubmit={this.handleSubmit}>
                    <fieldset>
                        {username}
                        {password}
                        <BaseUrlInput />
                        <input 
                            className="btn btn-lg btn-success btn-block" 
                            type="submit"
                            value={this.state.loading ? "Loading..." : "Login"}
                            disabled={this.state.loading} />
                    </fieldset>
                </form>
                <span>Oder <Link to="register">Registrieren</Link></span>
            </div>
        </div>;
        return <div id="login_wrapper">
            <section className="login container">
                <img src={logo} className="logo" />
                <h2 className="title">Norbert</h2>
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                        {loginForm}
                    </div>
                </div>
            </section>
        </div>
    },

    handleUsernameChange(oEvent) {
        this.setState({
            username: oEvent.target.value
        });
    },

    handlePasswordChange(oEvent) {
        this.setState({
            password: oEvent.target.value
        });
    },

    /**
     * Handle the login of the user.
     */
    handleSubmit(oEvent) {
        oEvent.preventDefault();
        let username = this.state.username.trim();
        let password = this.state.password;
        if (!username || !password) {
            this.setState({submitFailed: true});
            return;
        }
        //Start the authentication process.
        login(username, password);
    }
})

export default Login;
