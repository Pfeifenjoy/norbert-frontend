import dispatcher from "../dispatcher";
import constants from "../constants";

export function newUser(text) {
    dispatcher.dispatch({
        type: constants.NEW_USER_NAME,
        text
    })
}
