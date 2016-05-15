/**
 * @author Arwed Mett
 * @description Manage all configurations
 */
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

/**
 * A store to manage all settings like the api location.
 */
class ConfigStore extends EventEmitter {
    constructor() {
        super();

        this.config = Object.assign({
            serverRoot: location.origin,
            apiLocation: "/api/v1/"
        }, JSON.parse(window.localStorage.getItem("ConfigStore")))
        this.save();
    }

    save() {
        window.localStorage.setItem("ConfigStore", JSON.stringify(this.config));
    }
    getAll() {
        return this.config;
    }

    get apiLocation() {
        return this.config.serverRoot + this.config.apiLocation;
    }

    /**
    * Set a new location for the server root.
    * This might be used in a local app.
    */
    updateServerRoot(sNewRoot) {
        this.config.serverRoot = sNewRoot;
        this.save();
        this.emit("change");
    }

    handleActions(action) {
        switch(action.type) {
            case constants.NEW_SERVER_ROOT: {
                this.updateServerRoot(action.text);
                break;
            }
        }
    }
}

const configStore = new ConfigStore;
dispatcher.register(configStore.handleActions.bind(configStore));

export default configStore;
