/*
	Arwed Mett, Dominic Steinhauser
*/


import dispatcher from "../dispatcher";
import constants from "../constants";
import $ from "jquery";
import ConfigStore from "../stores/ConfigStore";
import UserStore from "../stores/UserStore";


export function login(username, password) {
    return $.ajax({
        url: ConfigStore.apiLocation + "users/login/",
        method: "POST",
        data: {
            username,
            password
        }
    }).done(() => {
        console.log("Logged in as user " + username + ".");
        dispatcher.dispatch({
            type: constants.AUTHENTICATED,
            username, password
        });
    }).fail(e => {
        console.error("Authentication failed: " + e);
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
        console.log("Logged out user.");
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
        console.log("Registration successfull for: " + username);
        return login(username, password);
    }).fail(e => {
        console.error(`Could not register ${username}: ${e}`);
        dispatcher.dispatch({
            type: constants.NEW_USER_FAILED,
            username
        })
    });
}

export function changePassword(password_old, password_new) {
	return $.ajax({
		url: ConfigStore.apiLocation + "users/",
		method: "PUT",
		data: {
			password_old,
			password_new
		}
    })
    .done(() => {
        console.log("Changed password successfully.");
    })
}

export function deleteAccount(){
	return $.ajax({
		url: ConfigStore.apiLocation + "users/" + UserStore.username,
		method: "DELETE",
		data: {}
    })
    .done(() => {
        console.log(`Deleted account ${UserStore.username}.`);
    })
    .done(logout)
}
