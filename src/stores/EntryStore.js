/**
 * @author Arwed Mett
 */
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import constants from "../constants";

/**
 * This is the main store to manage newsfeed objects.
 * In the frontend all newsfeed objects are called entries.
 */
class EntryStore extends EventEmitter {
    constructor() {
        super();
        this.data = {
            entries: [],
            editEntry: null //This is the entry which is currently edited.
        }
    }

    /**
    * A list of all entries.
    */
    get entries() {
        return this.data.entries;
    }

    /**
    * Get the entry which is currently edited.
    * Also use this to check if there is an edit entry.
    */
    get editEntry() {
        return this.data.editEntry;
    }

    /**
    * Get a specific entry by an id.
    */
    getEntry(id) {
        return this.data.entries.find(entry => {
            return entry.id === id;
        })
    }

    /**
    * Get the index of an entry by a specific id.
    */
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
                this.data.entries.unshift(action.entry);
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
entryStore.setMaxListeners(1000);
dispatcher.register(entryStore.handleActions.bind(entryStore));

export default entryStore;
