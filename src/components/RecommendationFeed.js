import React, { Component } from "react";
import RecommendationStore from "../stores/RecommendationStore";
import Recommendation from "./Recommendation";
import { updateRecommendations } from "../actions/RecommendationActions";

export default class RecommendationFeed extends Component {
    constructor() {
        super();
        this.state = {
            recommendations: RecommendationStore.recommendations
        }
    }

    componentWillMount() {
        this.handleNewRecommendations = () => {
            console.log("sdlkfj");
            this.setState({
                recommendations: RecommendationStore.recommendations
            });
        }
        RecommendationStore.on("change", this.handleNewRecommendations)
        updateRecommendations();
    }

    componentWillUnmount() {
        RecommendationStore.removeListener("change", this.handleNewRecommendations);
    }

    render() {
        const recommendations = this.state.recommendations.map(recommendation => {
            return <Recommendation
                        key={recommendation.id}
                        id={recommendation.id}
                    />;
        });
        return <div className="recommendationsFeed">
            {recommendations}
        </div>;
    }
}
