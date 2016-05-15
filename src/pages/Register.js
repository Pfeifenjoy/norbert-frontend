/*
* @author Arwed Mett
*/

import React, {Component} from "react";
import ConfigStore from "../stores/ConfigStore";
import BaseUrlInput from "../components/BaseUrlInput";
import { Link } from "react-router";
import { register } from "../actions/UserActions";
import UserStore from "../stores/UserStore";
let logo = require("../img/logo.png");

const Register = React.createClass({
    getInitialState() {
        return {
            config: ConfigStore.getAll(),
            username: "",
            password: "",
            repassword:"",
            submitFailed: false
        }
    },
    /**
     * Require the router for routing after the registration.
     */
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentWillMount() {
        ConfigStore.on("change", () => {
            this.setState({ config: ConfigStore.getAll() });
        });
        //Log in the user if he is registrated
        this.handleUserUpdate = () => {
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
        //Clean up event listeners
        UserStore.removeListener("change", this.handleUserUpdate);
    },
    render() {

        const submitFailedMessage = this.state.submitFailed ? <p>Could not register user.</p> : [];

        const usernameState = "form-group" + (this.state.submitFailed && this.state.username.trim() === "" ? " has-error" : "");
        const username = <div className={usernameState}>
            <input className="form-control" placeholder="Benutzername"
                   value={this.state.username}
                   onChange={this.handleUsernameChange} name="username"
                   type="text"/>
        </div>;

        const passwordState = "form-group" + (this.state.submitFailed && this.state.password.length < 10 ? " has-error" : "");
        const repasswordState = "form-group" + (this.state.submitFailed && this.state.repassword.length < 10 ? " Has-error" : "" );
        const password = <div className={passwordState}>
            <input className="form-control" placeholder="Passwort"
                   value={this.state.password}
                   onChange={this.handlePasswordChange} name="password"
                   type="password"
            />
        </div>;

        const rePassword =  <div className={repasswordState}>
            <input className="form-control" placeholder="Passwort"
                   value={this.state.repassword}
                   onChange={this.handleRePasswordChange} name="repassword"
                   type="password"
            />
        </div>;
        
        const registerForm = <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">Registrierung</h3>
            </div>
            <div className="panel-body">
                {submitFailedMessage}
                <form acceptCharset="UTF-8" role="form" action="index.html#/app" method="post"
                      onSubmit={this.handleSubmit}>
                    <fieldset>
                        {username}
                        {password}
                        {rePassword}
                        <BaseUrlInput />

                        <input className="btn btn-lg btn-success btn-block" type="submit" value="Registrieren"/>
                    </fieldset>
                </form>
                <span>Oder <Link to="login">Anmelden</Link></span>
            </div>
        </div>;

        return <div id="login_wrapper">
            <section className="login container">
                <img src={logo} className="logo" />
                <h2 className="title">Norbert</h2>
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                        {registerForm}
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

    handleRePasswordChange(oEvent) {
        this.setState({
            repassword: oEvent.target.value
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
        let repassword = this.state.repassword;
        if (!username || !password || password != repassword) {
            this.setState({submitFailed: true});
            return;
        }

        register(username, password)
        .fail(() => {
            this.setState({submitFailed: true});
        })
    }
});

export default Register;
