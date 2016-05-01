import dispatcher from "../dispatcher";
import constants from "../constants";
import $ from "jquery";
import ConfigStore from "../stores/ConfigStore";
import EntryStore from "../stores/EntryStore";


export function updateEntries() {
    return $.ajax({
        url: ConfigStore.apiLocation + "newsfeed/",
        method: "GET"
    })
    .done(entries => {
        dispatcher.dispatch({
            type: constants.UPDATE_ENTRIES,
            entries
        })
    })
    //TODO implement message system and add entries could not be loaded method
}

export function createEntry(entry) {
    return $.ajax({
        url: ConfigStore.apiLocation + "entries",
        method: "POST",
        data: entry
    })
    .done(entry => {
        dispatcher.dispatch({
            type: constants.CREATE_ENTRY,
            entry
        })
    })
    //TODO implement message system and add entries could not be loaded method
}

let lastXhr;
export function updateEntry(entry) {
    //kill all previous request, so that always the last
    //will be saved
    if(lastXhr) lastXhr.abort();
    lastXhr = $.ajax({
        url: ConfigStore.apiLocation + "entries/" + entry.id,
        method: "PUT",
        data: entry
    })
    .done(entry => {
        console.log("entry updated 1");
        let { id } = entry;
        dispatcher.dispatch({
            type: constants.UPDATE_ENTRY,
            entry, id
        });
    })
    return lastXhr;
    //TODO implement message system and add entries could not be loaded method
}

export function deleteEntry(id) {
    return $.ajax({
        url: ConfigStore.apiLocation + "entries/" + id,
        method: "DELETE"
    })
    .done(() => {
        dispatcher.dispatch({
            type: constants.DELETE_ENTRY,
            id
        });
    })
}

export function startEdit(id) {
    dispatcher.dispatch({
        type: constants.START_EDIT_ENTRY,
        id
    });
}

export function stopEdit(id) {
    dispatcher.dispatch({
        type: constants.STOP_EDIT_ENTRY
    })
}

export function loadNewImages(bottom) {
    dispatcher.dispatch({
        type: constants.LOAD_NEW_IMAGES
    });
}

export function uploadFile(file, entry) {
    entry.components.push({
        type: constants.DOCUMENT,
        data: {
            processing: true
        }
    })
    return updateEntry(entry)
    .done(() => {
        let data = new FormData;
        data.append("file", file);
        data.append("entryId", entry.id);
        data.append("componentId", entry.components.length - 1);
        return $.ajax({
            method: "POST",
            url: ConfigStore.apiLocation + "files",
            data,
            contentType: false,
            processData: false
        })
        .fail(e => {
            console.error(e);
        })
    })
    .done(() => {
        startEdit(entry.id);
    });
}
