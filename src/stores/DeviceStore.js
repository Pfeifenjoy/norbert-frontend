/**
 * @author Arwed Mett
 */
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

/**
 * A Store to manage the dimensions etc. of the device.
 * Everything which is specific for the device should be stored here.
 */
class DeviceStore extends EventEmitter {
    constructor() {
        super();
        this.device = {
            electron: window && window.process && window.process.type //Check if it is an electron app.
        }
    }
    getAll() {
        return this.device;
    }

    handleActions(action) {
        switch(action.type) {
            
        }
    }
}

const deviceStore = new DeviceStore;
dispatcher.register(deviceStore.handleActions.bind(deviceStore));

export default deviceStore;
