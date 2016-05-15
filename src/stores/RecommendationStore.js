/**
 * @author Arwed Mett
 */
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

/**
 * A store to manage all the recommendations.
 * This store will automatically update if there are new recommendations.
 */
class RecommendationStore extends EventEmitter {
    constructor() {
        super();
        this.data = {
            recommendations: []
        }
    }

    /**
    * Get an array of all recommendations.
    */
    get recommendations() {
        return this.data.recommendations;
    }

    /**
    * Get a specific recommendation.
    */
    getRecommendation(id) {
        return this.data.recommendations.find(recommendation => {
            return recommendation.id === id;
        });
    }

    /**
    * Get the index of a specific recommendation.
    * This is the index of the recommendations array.
    */
    getIndexOfRecommendation(id) {
        this.data.recommendations.findIndex(recommendation => {
            return recommendation.id === id;
        });
    }

    /**
    * Insert a new recommendation, when one is received.
    */
    handleNewRecommendations(recommendations) {
        this.data.recommendations = recommendations;
        this.emit("change");
    }

    /**
    * Update when a recommendation is deleted.
    */
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
