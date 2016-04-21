import React, {Component} from "react";
import {Modal, Button, ButtonGroup, SplitButton, MenuItem, Input} from "react-bootstrap";
import AddComponentDialog from "./AddComponentDialog";
import { deleteEntry, updateEntry } from "../../actions/EntryActions";
import EntryStore from "../../stores/EntryStore";
import { createComponent } from "./Component";
import moment from "moment";
import constants from "../../constants";

const Entry = React.createClass({
    getInitialState() {
        return {
            mouseOver: false,
            edit: this.props.edit,
            id: this.props.id,
            data: EntryStore.getEntry(this.props.id)
        };
    },

    componentWillMount() {
        EntryStore.on("change", () => {
            let data = EntryStore.getEntry(this.props.id);
            if(data) {
                this.setState({data});
            }
        });
        EntryStore.on("updateEntry", id => {
            if(this.props.id === id) {
                this.setState({
                    data: EntryStore.getEntry(this.props.id)
                })
            }
        });
    },

    propTypes: {
        id: React.PropTypes.string.isRequired,
        edit: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            edit: false
        }
    },
    getEditModal() {
        const components = this.state.data.components ? this.state.data.components.map((comp, i) => {
            return createComponent(comp, this.handleCompChange, i);
        }) : [];
        //Dialog to edit the entry
        return <Modal show={this.state.edit} onHide={this.handleEditClose}>
                <Modal.Header>
                    <Modal.Title>
                         <Input
                             type="text"
                             className="title"
                             value={this.state.data.title}
                             onChange={this.updateTitle}
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
                            className="fa-trash"
                            onClick={this.handleDelete}
                        ></Button>
                        <SplitButton
                            id={`add-component-${this.props.id}`}
                            bsStyle="primary"
                            title={<div className="fa-plus" />}
                            onClick={this.addTask}
                        >
                            <MenuItem onClick={this.addTask}>Task</MenuItem>
                            <MenuItem onClick={this.addText}>Text</MenuItem>
                            <MenuItem onClick={this.addNotification}>Erinnerung</MenuItem>
                            <MenuItem onClick={this.addDocument}>Document</MenuItem>
                        </SplitButton>
                    </ButtonGroup>
                </Modal.Footer>
        </Modal>;
    
    },

    getComponents() {
        return this.state.data.components || [];
    },

    hasCompWithType(type){
        return this.getComponents().find(comp => {
            return comp.type === type;
        }) ? true : false;
    },

    render() {

        const descriptions = this.getComponents().filter(comp => {
            return comp.type === constants.DESCRIPTION;
        })
        .map((comp, i) => {
            return <div className="description" key={i}>{comp.data}</div>;
        })

        const notificationSign = this.hasCompWithType(constants.NOTIFICATION) ? <span className="notificationSign fa-bell" /> : [];
        const documentSign = this.hasCompWithType(constants.DOCUMENT) ? <span className="documentSign fa-file" /> : [];
        
        const signs = <div className="signs">{notificationSign}{documentSign}</div>;

        return <div className="entry" 
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}>
                <div className={"fa fa-pencil modifyButton " + (this.state.mouseOver ? "" : "hidden")} 
                     onClick={this.handleEdit}></div>
                <h3 className="title">{this.state.data.title}</h3>
                {descriptions}
                {signs}
                {this.getEditModal()}
            </div>;
    },
    handleMouseOver(oEvent) {
        this.setState({mouseOver: true});
    },
    handleMouseOut(oEvent) {
        this.setState({mouseOver: false});
    },
    handleEdit() {
        this.setState({edit: true});
    },
    handleEditClose() {
        this.setState({edit: false});
        if(this.props.onCancel)
            this.props.onCancel();
    },
    handleDelete() {
        //TODO Ask if the entry should be deleted
        deleteEntry(this.props.id);
    },
    addTask() {
        this.addComponent({
            type: constants.TASK
        });
    },
    addText() {
        this.addComponent({ type: constants.DESCRIPTION });
    },
    addNotification() {
        this.addComponent({
            type: constants.NOTIFICATION,
            data: moment().format("YYYY-MM-DD")
        });
    },
    addDocument() {
        this.addComponent({
            type: constants.DOCUMENT
        });
    },
    addComponent(comp) {
        if(!comp.data) comp.data = "";
        this.state.data.components.push(comp);
        updateEntry(this.state.data);
    },

    updateTitle(oEvent) {
        let entry = this.state.data;
        entry.title = oEvent.target.value;
        updateEntry(entry);
    },
    handleCompChange(oComp) {
        this.state.data.components[oComp.id].data = oComp.data;
        this.setState({data: this.state.data});
        updateEntry(this.state.data, this.props.id);
    }
});

export default Entry;
