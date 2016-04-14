import React, {Component} from "react";
import {Button, SplitButton, MenuItem} from "react-bootstrap"

export default class AddComponentButton extends Component {
    
    render() {
        return <SplitButton
            bsStyle="primary"
            bsSize="medium"
            title={<div className="fa fa-plus"></div>}
        >
                <MenuItem>Erinnerung</MenuItem>
                <MenuItem>Text</MenuItem>
                <MenuItem>Text</MenuItem>
        </SplitButton>
    }
}
