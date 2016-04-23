import React, {Component} from "react";
import { logout } from "../actions/UserActions";
import { Link } from "react-router";

export default class TopBar extends Component {
    render() {
        return <nav className="topBar navbar navbar-fixed-top navbar-default" >
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#navbar-body"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Navigation einblenden</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand">Norbert</a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-body">

                        <form className="navbar-form navbar-left" role="search">
                            <div className="container">
                                <div className="form-group col-lg-6 col-lg-offset-3">
                                    <input type="text" className="form-control search" placeholder="Suche" />
                                </div>
                            </div>
                        </form>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/" onClick={this.handleLogout}>Verlassen</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>;
    }
    handleLogout() {
        logout();
    }
}
