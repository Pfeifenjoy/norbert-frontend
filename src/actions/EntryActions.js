import dispatcher from "../dispatcher";
import constants from "../constants";

export function updateEntries() {
    //TODO request
    const entries = [
        {
            id: "0",
            title: "test"
        }
    ] //TODO delete
    dispatcher.dispatch({
        type: constants.UPDATE_ENTRIES,
        entries
    })
}

export function createEntry(entry) {
    //TODO request
    entry.id = new Date() + ""//TODO delete
    dispatcher.dispatch({
        type: constants.CREATE_ENTRY,
        entry
    })
}

export function updateEntry(entry) {
    //TODO request
    let { id } = entry; //TODO delete
    dispatcher.dispatch({
        type: constants.UPDATE_ENTRY,
        entry, id
    });
}

export function deleteEntry(id) {
    //TODO request
    dispatcher.dispatch({
        type: constants.DELETE_ENTRY,
        id
    });
}
