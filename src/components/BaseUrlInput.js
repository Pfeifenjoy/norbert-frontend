/**
 * @author Arwed Mett
 */
import React, {Component} from "react";
import configStore from "../stores/ConfigStore";
import deviceStore from "../stores/DeviceStore";
import {changeServerRoot} from "../actions/ConfigActions";

/**
 * This is an input field to change the server root.
 * Use this field in the login of an offline app.
 */
export default class BaseUrlInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: configStore.getAll(),
            device: deviceStore.getAll()
        }
    }
    componentWillMount() {
        configStore.on("change", () => {
            this.setState({
                config: configStore.getAll()
            });
        });
    }
    render() {
        //Only display in electron app
        if(this.state.device.electron) {
            return <div className="input-group" id="url">
                <span className="input-group-addon">host</span>
                <input className="form-control" placeholder="http://www.chat.de"
                   value={this.state.config.serverRoot}
                   onChange={this.handleBaseUrlChange.bind(this)} 
                   type="text"/>

               </div>
                ;
        }
        return <div></div>;
    }

    handleBaseUrlChange(oEvent) {
        changeServerRoot(oEvent.target.value);
    }
}

