import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

class EntryStore extends EventEmitter {
    constructor() {
        super();
        this.data = {
            entries: [],
            editEntry: null
        }
    }
    get entries() {
        return this.data.entries;
    }

    get editEntry() {
        return this.data.editEntry;
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
                this.emit("change");
                break;
            }
            case constants.CREATE_ENTRY: {
                if(!action.entry.components) action.entry.components = [];
                this.data.entries.push(action.entry);
                this.emit("change")
                break;
            }
            case constants.UPDATE_ENTRY: {
                this.data.entries[this.getEntryIndex(action.id)] = action.entry;
                this.emit("updateEntry", action.id)
                break;
            }
            case constants.DELETE_ENTRY: {
                this.data.entries.splice(this.getEntryIndex(action.id), 1);
                this.emit("change");
                break;
            }
            case constants.START_EDIT_ENTRY: {
                this.data.editEntry = this.getEntry(action.id);
                this.emit("editEntryChanged", this.data.editEntry);
                break;
            }
            case constants.STOP_EDIT_ENTRY: {
                this.data.editEntry = null;
                this.emit("editEntryChanged", null);
                break;
            }
        }
    }
}

const entryStore = new EntryStore;
dispatcher.register(entryStore.handleActions.bind(entryStore));

export default entryStore;
