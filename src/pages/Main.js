import React, {Component} from "react";
import TopBar from "../components/TopBar";
import Newsfeed from "../components/Newsfeed";

export default class Login extends Component {

    render() {
        return <div>
            <section className="wrapper">
                <div className="container">
                    <Newsfeed />
                </div>
            </section>
        </div>
    }
}
