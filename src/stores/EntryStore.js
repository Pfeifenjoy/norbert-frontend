import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

class EntryStore extends EventEmitter {
    constructor() {
        super();
        this.data = {
            entries: []
        }
    }
    get entries() {
        return this.data.entries;
    }
    getEntry(id) {
        return this.data.entries.find(entry => {
            return entry.id === id;
        })
    }
    getEntryIndex(id) {
        return this.data.entries.findIndex(entry => {
            return entry.id === id;
        })
    }

    handleActions(action) {
        switch(action.type) {
            case constants.UPDATE_ENTRIES: {
                this.data.entries = action.entries;
                break;
            }
            case constants.CREATE_ENTRY: {
                this.data.entries.push(action.entry);
                break;
            }
            case constants.UPDATE_ENTRY: {
                this.data.entry[this.getEntryIndex(action.id)] = action.entry;
                break;
            }
            case constants.DELETE_ENTRY: {
                this.data.entries.splice(this.getEntryIndex(action.id), 1);
                break;
            }
        }
        this.emit("change");
    }
}

const entryStore = new EntryStore;
dispatcher.register(entryStore.handleActions.bind(entryStore));

export default entryStore;
