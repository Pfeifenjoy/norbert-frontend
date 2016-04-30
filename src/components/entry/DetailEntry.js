import React, { Component } from "react";
import {Modal, Button, ButtonGroup, SplitButton, MenuItem, Input} from "react-bootstrap";
import { deleteEntry, updateEntry, stopEdit } from "../../actions/EntryActions";
import EntryStore from "../../stores/EntryStore";
import constants from "../../constants";

export default class DetailEntry extends Component {

    constructor() {
        super();
        this.state = {
            data: EntryStore.editEntry,
            components: []
        }
    }

    componentWillMount() {
        EntryStore.on("editEntryChanged", entry => {
            this.setState({
                data: entry
            })
        })
    }
    render() {
        if(!this.state.data) return <div hidden="true" />;
        const components = this.state.data.components ? this.state.data.components.map((comp, i) => {
            return <div key={i}>{createComponent(comp, this.handleCompChange.bind(this, i))}</div>
        }) : [];
        //Dialog to edit the entry
        return <Modal show={true} onHide={this.handleEditClose.bind(this)}>
                <Modal.Header>
                    <Modal.Title>
                         <Input
                             type="text"
                             className="title"
                             value={this.state.data.title}
                             onChange={this.updateTitle.bind(this)}
                         />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {components}
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button
                            bsStyle="danger"
                            
                            onClick={this.handleDelete.bind(this)}
                        ><div className="fa fa-trash fa-fw"/></Button>
                        <SplitButton
                            id={`add-component-${this.props.id}`}
                            bsStyle="primary"
                            title={<div className="fa fa-plus fa-fw " />}
                            onClick={this.addTask.bind(this)}
                        >
                            <MenuItem onClick={this.addTask.bind(this)}>Aufgabe</MenuItem>
                            <MenuItem onClick={this.addText.bind(this)}>Text</MenuItem>
                            <MenuItem onClick={this.addNotification.bind(this)}>Erinnerung</MenuItem>
                            <MenuItem onClick={this.addDocument.bind(this)}>Document</MenuItem>
                        </SplitButton>
                    </ButtonGroup>
                </Modal.Footer>
        </Modal>;
    }
    handleDelete() {
        stopEdit();
        deleteEntry(this.state.data.id);
    }
    addTask() {
        this.addComponent({
            type: constants.TASK,
            data: {
                finished: false,
                text: ""
            }
        });
    }
    addText() {
        this.addComponent({ type: constants.DESCRIPTION });
    }
    addNotification() {
        this.addComponent({
            type: constants.NOTIFICATION,
            data: {}
        });
    }
    addDocument() {
        this.addComponent({
            type: constants.DOCUMENT
        });
    }
    addComponent(comp) {
        if(!comp.data) comp.data = "";
        this.state.data.components.push(comp);
        this.setState({
            data: this.state.data
        })
        updateEntry(this.state.data);
    }
    updateTitle(oEvent) {
        let entry = this.state.data;
        entry.title = oEvent.target.value;
        if(entry.title.length >= 30) return;
        this.setState({
            data: entry
        })
        updateEntry(entry);
    }
    handleCompChange(id, component) {
        this.state.data.components[id] = component;
        this.setState({data: this.state.data});
        updateEntry(this.state.data, this.props.id);
    }
    handleEditClose() {
        stopEdit();
    }
}

function createDescription(component, change) {
    let rows = component.data.split("\n").length;
    rows = rows >= 5 ? rows : 5;
    return <Input
        type="textarea"
        placeholder="Beschreibung..."
        value={component.data}
        onChange={onChange}
        rows={rows}
        className="textarea description"
    />;
    function onChange(oEvent) {
        component.data = oEvent.target.value;
        change(component)
    }
};


function createNotification(component, change) {
    return <div
            className="input-group notification"
        >
        <span className="input-group-addon fa fa-bell" />
        <input
            onChange={onChange}
            type="date"
            className="form-control"
            value={component.data.date}
        />
    </div>;

    function onChange(oEvent) {
        component.data.date = oEvent.target.value;
        change(component);
    }
}

function createDocument(component, change) {
    return <div className="input-group">
        <input className="form-control" type="file" />
        <span className="input-group-btn">
            <button className="fa fa-paperclip btn"></button>
        </span>
    </div>;
}

function createTask(component, change) {
    return <div className="input-group">
        <span
            className="input-group-addon"
        >
            <input 
                type="checkbox"
                checked={component.data.finished}
                onChange={onChecked}
            />
        </span>

        <input
            className="form-control"
            type="text"
            onChange={onChange}
            value={component.data.text}
        />
    </div>;
    function onChecked(oEvent) {
        component.data.finished = !component.data.finished;
        change(component);
    }
    function onChange(oEvent) {
        component.data.text = oEvent.target.value;
        change(component);
    }
}

function createComponent(comp, onChange) {
    let creator = function() {
        console.warn("Unknown component type: " + comp.type);
        return <div hidden="true" />
    }
    switch(comp.type) {
        case constants.DESCRIPTION: {
            creator = createDescription;
            break;
        }
        case constants.NOTIFICATION: {
            creator = createNotification;
            break;
        }
        case constants.DOCUMENT: {
            creator = createDocument;
            break;
        }
        case constants.TASK: {
            creator = createTask;
            break;
        }
    }
    return creator(comp, onChange);
}
