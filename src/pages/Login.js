import React, {Component} from "react";
import ConfigStore from "../stores/ConfigStore";
import BaseUrlInput from "../components/BaseUrlInput";
import {Link} from "react-router";
import { login } from "../actions/UserActions";
import UserStore from "../stores/UserStore";
let logo = require("../img/logo.png");

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

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillMount() {
        this.handleConfigUpdate = () => {
            this.setState({ config: ConfigStore.getAll() });
        };
        ConfigStore.on("change", this.handleConfigUpdate);
        this.handleUserUpdate = () => {
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
        ConfigStore.removeListener("change", this.handleConfigUpdate);
        UserStore.removeListener("change", this.handleUserUpdate);
    },
    render() {
        const usernameState = "form-group" + (this.state.submitFailed && this.state.username.trim() === "" ? " has-error" : "");
        const username = <div className={usernameState}>
            <input className="form-control" placeholder="Username"
               value={this.state.username}
               onChange={this.handleUsernameChange} name="username"
               disabled={this.state.loading}
               type="text"/>
           </div>;
        const passwordState = "form-group" + (this.state.submitFailed && this.state.password.length < 10 ? " has-error" : "");
        const password = <div className={passwordState}>
            <input className="form-control" placeholder="Password"
               value={this.state.password}
               onChange={this.handlePasswordChange} name="password"
               type="password"
               disabled={this.state.loading}
               />
           </div>;
       const loginFailed = this.state.submitFailed ? 
           <div className="alert alert-dange">Login failed.</div> : [];
       const loginForm = <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">Please sign in</h3>
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
                <span>Or <Link to="register">register</Link></span>
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

    handleSubmit(oEvent) {
        oEvent.preventDefault();
        let username = this.state.username.trim();
        let password = this.state.password;
        if (!username || !password) {
            this.setState({submitFailed: true});
            return;
        }
        login(username, password);
    }
})

export default Login;
