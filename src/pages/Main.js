/*
	Arwed Mett, Dominic Steinhauser
*/


import React, {Component} from "react";
import TopBar from "../components/TopBar";
import Newsfeed from "../components/Newsfeed";
import RecommendationFeed from "../components/RecommendationFeed";

export default class Login extends Component {

    render() {
        return <div>
            <section className="wrapper ">
                <div className="fluid-container main_bg">
                    <div className="col-lg-8 col-md-8 col-xs-6">
                        <Newsfeed />
                    </div>
                    <div className="col-lg-4 col-md-8 col-xs-6">
                        <RecommendationFeed />
                    </div>
                </div>
            </section>
        </div>
    }
}

