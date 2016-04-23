import React, {Component} from "react";

export default class TopBar extends Component {
    render() {
        return <nav className="topBar navbar navbar-fixed-top navbar-default" >
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand">Norbert</a>
                    </div>
                    <div className="navbar-form" role="search">
                        <div className="container">
                            <div className="form-group col-lg-6 col-lg-offset-3">
                                <input type="text" className="form-control search" placeholder="Suche" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>;
    }
}
