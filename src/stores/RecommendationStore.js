import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

class RecommendationStore extends EventEmitter {
    constructor() {
        super();
        this.data = {
            recommendations: []
        }
    }

    get recommendations() {
        return this.data.recommendations;
    }

    getRecommendation(id) {
        return this.data.recommendations.find(recommendation => {
            return recommendation.id === id;
        });
    }

    getIndexOfRecommendation(id) {
        this.data.recommendations.findIndex(recommendation => {
            return recommendation.id === id;
        });
    }

    handleNewRecommendations(recommendations) {
        this.data.recommendations = recommendations;
        this.emit("change");
    }

    handleDeleteRecommendation(id) {
        this.data.recommendations.splice(this.getIndexOfRecommendation(id), 1);
        this.emit("change");
    }

    handleActions(action) {
        switch(action.type) {
            case constants.NEW_RECOMMENDATIONS: {
                this.handleNewRecommendations(action.recommendations);
                break;
            }
            case constants.DELETE_RECOMMENDATION: {
                this.handleDeleteRecommendation(action.id);
                break;
            }
        }
    }
}

const recommendationStore = new RecommendationStore;
dispatcher.register(recommendationStore.handleActions.bind(recommendationStore));

export default recommendationStore;
