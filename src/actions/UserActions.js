import dispatcher from "../dispatcher";
import constants from "../constants";
import $ from "jquery";
import ConfigStore from "../stores/ConfigStore";

export function login(username, password) {
    $.ajax({
        url: ConfigStore.apiLocation + "login",
        method: "POST",
        data: {
            username,
            password
        }
    }).done(() => {
        dispatcher.dispatch({
            type: constants.AUTHENTICATED,
            username, password
        });
    }).fail(() => {
        dispatcher.dispatch({
            type: constants.AUTHENTICATION_FAILED
        });
    });
}

export function logout() {
    $.ajax({
        url: ConfigStore.apiLocation + "/logout",
        method: "GET"
    }).done(() => {
        dispatcher.dispatch({
            type: constants.UNAUTHENTICATED
        });
    });
}
