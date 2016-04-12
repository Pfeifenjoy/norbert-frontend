import React, {Component} from "react";
import ConfigStore from "../stores/ConfigStore";
import BaseUrlInput from "../components/BaseUrlInput";
import {Link} from "react-router";
import { newUser } from "../actions/UserActions";
let logo = require("../img/logo.png");

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            config: ConfigStore.getAll(),
            submitFailed: false,
            loading: false,
            username: "",
            password: ""
        }
    }
    componentWillMount() {
        ConfigStore.on("change", () => {
            this.setState({ config: ConfigStore.getAll() });
        });
    }
    render() {
        const usernameState = "form-group" + (this.state.submitFailed && this.state.username.trim() === "" ? " has-error" : "");
        const username = <div className={usernameState}>
            <input className="form-control" placeholder="Username"
               value={this.state.username}
               onChange={this.handleUsernameChange.bind(this)} name="username"
               disabled={this.state.loading}
               type="text"/>
           </div>;
        const passwordState = "form-group" + (this.state.submitFailed && this.state.password.length < 10 ? " has-error" : "");
        const password = <div className={passwordState}>
            <input className="form-control" placeholder="Password"
               value={this.state.password}
               onChange={this.handlePasswordChange.bind(this)} name="password"
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
                      onSubmit={this.handleSubmit.bind(this)}>
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
    }

    handleUsernameChange(oEvent) {
        this.setState({
            username: oEvent.target.value
        });
    }

    handlePasswordChange(oEvent) {
        this.setState({
            password: oEvent.target.value
        });
    }

    handleSubmit(oEvent) {
        oEvent.preventDefault();
        let username = this.state.username.trim();
        let password = this.state.password;
        if (!username || !password) {
            this.setState({submitFailed: true});
            return;
        }

        $.ajax({
            url: this.state.config.serverRoot + this.state.config.apiLocation + "/authenticate",
            method: "POST",
            data: { username, password },
            crossDomain: true
        }).done(oData => {
            newUser(username);
            const { location } = this.props;

            if(location.state && location.state.nextPathname) {
                this.context.router.replace(location.state.nextPathname);
            }
            else {
                this.context.router.replace("/");
            }
        }).fail(() => {
            this.setState({submitFailed: true, loading: false, password: ""});
        }).finally(() => {
            this.setState({authenticating: false});
        });
    }
}
