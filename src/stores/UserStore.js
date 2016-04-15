import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

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
    get authenticated() {
        return true; //TODO this.data.username === "" ? false : true;
    }
    get username() {
        return this.data.username;
    }
    get authenticationFailed() {
        return this.data.authenticationFailed;
    }

    handleActions(action) {
        switch (action.type) {
            case constants.AUTHENTICATED:
            {
                this.data.username = action.username;
                sessionStorage.setItem("username", action.username);
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
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
