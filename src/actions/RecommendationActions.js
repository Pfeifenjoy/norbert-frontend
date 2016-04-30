import dispatcher from "../dispatcher";
import constants from "../constants";
import $ from "jquery";
import ConfigStore from "../stores/ConfigStore";
import { createEntry } from "./EntryActions";
import RecommendationStore from "../stores/RecommendationStore";

export function updateRecommendations() {
    //TODO request
    let recommendations = [
        {
            "title": "Test Recommendation",
            "components": [],
            "tags": [],
            "equality_group": "571be59558288c58202f8bfd",
            "id": "571be59558288c58202f8bfe"
        }
    ];

    setTimeout(() => {
    dispatcher.dispatch({
        type: constants.NEW_RECOMMENDATIONS,
        recommendations
    });
    }, 0);
}

export function acceptRecommendation(recommendation) {
    delete recommendation.id;
    return createEntry(recommendation)
    .then(entry => {
        let { id } = entry;
        console.log(id);
        dispatcher.dispatch({
            type: constants.DELETE_RECOMMENDATION,
            id
        })
    })
}

export function rejectRecommendation(id) {
    //TODO request
    dispatcher.dispatch({
        type: constants.DELETE_RECOMMENDATION,
        id
    });
}
