/**
 * @author Arwed Mett
 * @description All actions which are related to entries and information.
 */
import dispatcher from "../dispatcher";
import constants from "../constants";
import $ from "jquery";
import ConfigStore from "../stores/ConfigStore";
import EntryStore from "../stores/EntryStore";

/*
 * All these methods return a deferred object.
 * Only use this deferred object for error detection.
 * All these methods make asynchronous calls to the backend.
 */

/**
 * Reinitialize all entries
 */
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
}

/**
 * Create a new entry.
 */
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
}

//save previous ajax requests.
let lastXhr;
/**
 * Update an Entry.
 */
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
        let { id } = entry;
        dispatcher.dispatch({
            type: constants.UPDATE_ENTRY,
            entry, id
        });
    })
    return lastXhr;
}

/**
 * Delete an entry.
 */
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

/**
 * This loads an entry by a given id into the edit modal.
 */
export function startEdit(id) {
    dispatcher.dispatch({
        type: constants.START_EDIT_ENTRY,
        id
    });
}

/**
 * This stops the edit process of the modal.
 */
export function stopEdit(id) {
    dispatcher.dispatch({
        type: constants.STOP_EDIT_ENTRY
    })
}

/**
 * Update the status of a processing file has changed.
 */
function updateUploading(entry) {
    $.ajax({
        url: ConfigStore.apiLocation + "entries/" + entry.id,
        method: "GET"
    })
    .done(entry => {
        let processing = false;
        entry.components.forEach(comp => {
            processing = !!comp.data.processing || processing;
        })
        //recheck for updates
        if(processing) setTimeout(updateUploading.bind(null, entry), 400);
        //Always show updates
        dispatcher.dispatch({
            type: constants.UPDATE_ENTRY,
            entry, id: entry.id
        });
    })
}

let queuee = $.Deferred();
queuee.resolve();
/**
 * Upload a file to a specific entry component.
 */
export function uploadFile(file, entry) {
    entry.components.push({
        type: constants.DOCUMENT,
        data: {
            processing: true
        }
    })
    queuee = queuee.done(() => {
        return updateEntry(entry)
        .done(entry => {
            let data = new FormData;
            data.append("file", file);
            data.append("entryId", entry.id);
            data.append("componentId", entry.components[entry.components.length - 1].id);
            return $.ajax({
                method: "POST",
                url: ConfigStore.apiLocation + "files",
                data,
                contentType: false,
                processData: false
            })
        })
        .done(updateUploading.bind(null, entry))
        .done(() => {
            return startEdit(entry.id);
        })
        .fail(e => {
            console.error("Could not upload file: " + e);
        })
    })
    return queuee;
}


/**
 * Hide an information in the newsfeed of the user.
 */

export function hideInformation(id) {
    return $.ajax({
        url: `${ConfigStore.apiLocation}information/${id}`,
        type: "DELETE"
    })
    .done(() => {
        dispatcher.dispatch({
            type: constants.HIDE_INFORMATION,
            id
        });
    });
}
