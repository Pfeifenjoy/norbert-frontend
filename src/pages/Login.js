import React, {Component} from "react";
import LoginForm from "../components/LoginForm";
import ConfigStore from "../stores/ConfigStore";
import BaseUrlInput from "../components/BaseUrlInput";
let logo = require("../img/logo.png");

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            config: ConfigStore.getAll()
        }
    }
    componentWillMount() {
        ConfigStore.on("change", () => {
            this.setState({ config: ConfigStore.getAll() });
        });
    }
    render() {
        return <div id="login_wrapper">
            <section className="login container">
                <img src={logo} className="logo" />
                <h2 className="title">Norbert</h2>
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                        <LoginForm target={this.state.config.serverRoot + this.state.config.apiLocation} wss={this.state.config.wssRoot}>
                            <BaseUrlInput />
                        </LoginForm>
                    </div>
                </div>
            </section>
        </div>
    }
}
