import React, {Component} from "react";
import TopBar from "../components/TopBar";

export default class Layout extends Component {
    render() {
        return <div className="wrapper">
                    <TopBar />
                    <section className="content">
                        {this.props.children}
                    </section>

                </div>;
    }
}
