import dispatcher from "../dispatcher";
import constants from "../constants";
import $ from "jquery";
import ConfigStore from "../stores/ConfigStore";


export function login(username, password) {
    return $.ajax({
        url: ConfigStore.apiLocation + "users/login/",
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
    return $.ajax({
        url: ConfigStore.apiLocation + "users/logout",
        method: "POST"
    }).done(() => {
        dispatcher.dispatch({
            type: constants.UNAUTHENTICATED
        });
    });
}

export function register(username, password) {
    return $.ajax({
        url: ConfigStore.apiLocation + "users",
        method: "POST",
        data: {
            username,
            password
        }
    }).done(() => {
        return login(username, password);
    }).fail(e => {
        dispatcher.dispatch({
            type: constants.NEW_USER_FAILED,
            username
        })
    });
}
