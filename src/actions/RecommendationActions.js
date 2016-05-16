/**
 * @author Arwed Mett
 * @description All actions concerning recommendations.
 */
import dispatcher from "../dispatcher";
import constants from "../constants";
import $ from "jquery";
import ConfigStore from "../stores/ConfigStore";
import RecommendationStore from "../stores/RecommendationStore";

/**
 * Fetch all recommendations from the server.
 */
export function updateRecommendations() {
    return $.ajax({
        url: ConfigStore.apiLocation + "recommendations",
        method: "GET"
    })
    .done(recommendations => {
        dispatcher.dispatch({
            type: constants.NEW_RECOMMENDATIONS,
            recommendations
        });
    })
}

/**
 * Move a recommendation into the newsfeed.
 */
export function acceptRecommendation(recommendation) {
    return $.ajax({
        url: ConfigStore.apiLocation + "recommendations/" + recommendation.id,
        method: "POST"
    })
    .done(entry => {
        dispatcher.dispatch({
            type: constants.CREATE_ENTRY,
            entry
        });
    })
    .done(updateRecommendations);
}

/**
 * Hide a recommendation for the user.
 */
export function rejectRecommendation(recommendation) {
    let { id } = recommendation;
    return $.ajax({
        url: ConfigStore.apiLocation + "recommendations/" + id,
        method: "DELETE"
    })
    .done(() => {
        dispatcher.dispatch({
            type: constants.DELETE_RECOMMENDATION,
            id
        });
    })
}
