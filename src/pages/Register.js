/*
	Arwed Mett
*/

import React, {Component} from "react";
import ConfigStore from "../stores/ConfigStore";
import BaseUrlInput from "../components/BaseUrlInput";
import { Link } from "react-router";
import { register } from "../actions/UserActions";
let logo = require("../img/logo.png");

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: ConfigStore.getAll(),
            username: "",
            password: "",
            repassword:"",
            submitFailed: false
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
                   type="text"/>
        </div>;
        const passwordState = "form-group" + (this.state.submitFailed && this.state.password.length < 10 ? " has-error" : "");
        const repasswordState = "form-group" + (this.state.submitFailed && this.state.repassword.length < 10 ? " Has-error" : "" );
        const password = <div className={passwordState}>
            <input className="form-control" placeholder="Password"
                   value={this.state.password}
                   onChange={this.handlePasswordChange.bind(this)} name="password"
                   type="password"
            />
        </div>;
        const rePassword =  <div className={repasswordState}>
            <input className="form-control" placeholder="Repassword"
                   value={this.state.repassword}
                   onChange={this.handleRePasswordChange.bind(this)} name="repassword"
                   type="password"
            />
        </div>;
        const registerForm = <div className="panel panel-default">
            <div className="panel-heading">
                <h3 className="panel-title">Please register</h3>
            </div>
            <div className="panel-body">
                <form acceptCharset="UTF-8" role="form" action="index.html#/app" method="post"
                      onSubmit={this.handleSubmit.bind(this)}>
                    <fieldset>
                        {username}
                        {password}
                        {rePassword}
                        <BaseUrlInput />

                        <input className="btn btn-lg btn-success btn-block" type="submit" value="Register"/>
                    </fieldset>
                </form>
                <span>Or <Link to="login">login</Link></span>
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
    }

    handleUsernameChange(oEvent) {
        this.setState({
            username: oEvent.target.value
        });
    }

    handleRePasswordChange(oEvent) {
        this.setState({
            repassword: oEvent.target.value
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
}
