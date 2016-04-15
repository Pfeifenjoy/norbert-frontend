import dispatcher from "../dispatcher";
import constants from "../constants";

export function updateEntries() {
    //TODO request and delete test data
    
    const entries = [
        {
            id: "0",
            title: "1 Test"
        }
    ];
    dispatcher.dispatch({
        type: constants.UPDATE_ENTRIES,
        entries
    });
}

export function createEntry(entry) {
    //TODO request
    enty.id = new Date(); //TODO delete
    dispatcher.dispatch({
        type: constants.CREATE_ENTRY, 
        entry
    })
}

export function deleteEntry(entry) {
    //TODO request
    let id = entry.id; 
    dispatcher.dispatch({
        type: constants.DELETE_ENTRY,
        id
    })
}

export function updateEntry(entry) {
    //TODO request
    dispatcher.dispatch({
        type: constants.UPDATE_ENTRY,
        entry
    })
}
