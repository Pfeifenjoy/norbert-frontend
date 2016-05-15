/**
 * @author Arwed Mett
 */
import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

/**
 * Manage all the user specific data.
 * This is used for login, logout, register or other user specific settings.
 */
class UserStore extends EventEmitter {
    constructor() {
        super();

        this.data = {
            username: sessionStorage.getItem("username") || "",
            authenticationFailed: false
        };
    }
    getAll() {
        return this.data;
    }
    /**
    * Is set if the user is authenticated.
    */
    get authenticated() {
        return this.data.username === "" ? false : true;
    }
    get username() {
        return this.data.username;
    }
    set username(name) {
        sessionStorage.setItem("username", name);
        this.data.username = name;
    }
    /**
    * Check if a previous authentication has failed.
    */
    get authenticationFailed() {
        return this.data.authenticationFailed;
    }

    handleActions(action) {
        switch (action.type) {
            case constants.AUTHENTICATED:
            {
                this.username = action.username;
                this.data.authenticationFailed = false;
                this.emit("change");
                break;
            }
            case constants.UNAUTHENTICATED:
            {
                this.data.username = "";
                this.emit("change");
                break;
            }
            case constants.AUTHENTICATION_FAILED:
            {
                this.data.authenticationFailed = true;
                this.emit("change");
                break;
			
            }
			
			//case constants.CHANGEPASSWORD:
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
