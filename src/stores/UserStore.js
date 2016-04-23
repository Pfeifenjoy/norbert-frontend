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
        return this.data.username === "" ? false : true;
    }
    get username() {
        return this.data.username;
    }
    set username(name) {
        sessionStorage.setItem("username", name);
        this.data.username = name;
    }
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
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
