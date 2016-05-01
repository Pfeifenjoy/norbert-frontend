/*
	@author Arwed Mett, Dominic Steinhauser
*/

import React, {Component} from "react";
import { logout } from "../actions/UserActions";
import { Link } from "react-router";

export default class TopBar extends Component {
    render() {
        return <nav className="topBar navbar navbarcolor navbar-fixed-top navbar-default" >
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
                        <Link to="/" className="navbar-brand" ><p className="fa fa-home fa-fw"/>Norbert</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-body">

                        <form className="navbar-form navbar-left" role="search">
                            
                                <div className="form-group">
                                    <input type="text" className="form-control search" placeholder="Suche" />
                                </div>
                            
                        </form>
                        <ul className="nav navbar-nav navbar-right">
							<li>
                                <Link to="/settings" ><p className="fa fa-cog fa-fw"/>Einstellungen</Link>
                            </li>
                            <li>
                                <Link to="/" onClick={this.handleLogout}><p className="fa fa-sign-out fa-fw"/>Verlassen</Link>
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
