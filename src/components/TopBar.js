import React, {Component} from "react";

export default class TopBar extends Component {
    render() {
        return <nav className="topBar navbar navbar-fixed-top navbar-default" >
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">Norbert</a>
                    </div>
                </div>
            </nav>;
    }
}
