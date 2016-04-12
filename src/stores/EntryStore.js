import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

class EntryStore extends EventEmitter {
    constructor() {
        super();
        this.data = {
            entries: {
                "0": {
                    title: "1 Test"
                }
            }
        }
    }
    getAll() {
        return this.data;
    }
    get(id) {
        return this.data.entries[id];
    }

    handleActions(action) {
        switch(action.type) {
            case constants.ADD_ENTRY: {
                this.data.entries.push(action.entry);
                break;
            }
            case constants.DELETE_ENTRY: {
                this.data.entries.splice(this.data.entries.indexOf(this.get(action.id)));
                break;
            }
        }
        this.emit("change");
    }
}

const entryStore = new EntryStore;
dispatcher.register(entryStore.handleActions.bind(entryStore));

export default entryStore;
