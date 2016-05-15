/**
 * @author Arwed Mett
 * @description Change config settings.
 */
import dispatcher from "../dispatcher";
import {NEW_SERVER_ROOT} from "../constants";

/**
 * Change the root of the server.
 * Use this if you are in an electron app, where you do not have
 * a location.
 * Basically this is used in offline apps.
 */
export function changeServerRoot(text) {
    dispatcher.dispatch({
        type: NEW_SERVER_ROOT,
        text,
    });
}


