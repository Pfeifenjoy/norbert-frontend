import React, { Component } from "react";
import RecommendationStore from "../stores/RecommendationStore";
import { acceptRecommendation, rejectRecommendation } from "../actions/RecommendationActions";

export default class Recommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendation: RecommendationStore.getRecommendation(props.id)
        }
    }

    componentWillMount() {
        this.handleUpdateRecommendation = () => {
            this.setState({
                recommendation: RecommendationStore.getRecommendation(this.props.id)
            });
        }
        RecommendationStore.on("change", this.handleUpdateRecommendation);
    }

    componentWillUnmount() {
        RecommendationStore.removeListener("change", this.handleUpdateRecommendation);
    }

    render() {
        const { recommendation } = this.state;
        return <div className="recommendation col-lg-6 col-md-12">
            <h3>{ recommendation.title }</h3>

            <div className="actions">
                <span
                    onClick={this.handleRejectRecommendation.bind(this)}
                    className="trigger reject fa-times"
                />
                <span
                    onClick={this.handleAcceptRecommendation.bind(this)}
                    className="trigger accept fa-check"
                />
            </div>
        </div>;
    }

    handleAcceptRecommendation() {
        acceptRecommendation(this.state.recommendation);
    }
    handleRejectRecommendation() {
        rejectRecommendation(this.state.recommendation);
    }
}
