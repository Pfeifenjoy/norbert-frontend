import {EventEmitter} from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.config = {
            username: "",
            authenticated: false
        };

        $.ajax("authenticated")
        .done(authed => { 
            this.config.authenticated = authed;
            this.emit("change");
        });
    }
    getAll() {
        return this.config;
    }
    get authenticated() {
        return this.config.authenticated;
    }
    handleActions(action) {
        switch (action.type) {
            case constants.USER_AUTHENTICATION:
            {
                this.config.loggedIn = action.result;
                this.emit("change");
                break;
            }
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
