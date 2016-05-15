/*
 * @author Arwed Mett
*/

import React, {Component} from "react";
import TopBar from "../components/TopBar";

/**
 * General layout for the main page.
 * It mainly proviedes the topbar and some wrapper classes.
 */
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
