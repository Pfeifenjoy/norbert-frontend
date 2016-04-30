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
            console.log(recommendation);
            return <div key={recommendation.id}>
                <Recommendation
                        id={recommendation.id}
                    />
                </div>;
        });
        return <div className="recommendationsFeed">
            {recommendations}
        </div>;
    }
}
