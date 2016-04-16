import React, {Component} from "react";
import {Modal, Button, ButtonGroup, SplitButton, MenuItem} from "react-bootstrap";
import AddComponentDialog from "./AddComponentDialog";
import { deleteEntry } from "../../actions/EntryActions";
import EntryStore from "../../stores/EntryStore";

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
    render() {

        //Dialog to edit the entry
        const editModal = <Modal show={this.state.edit} onHide={this.handleEditClose}>
                <Modal.Header>
                    <Modal.Title>{this.state.data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        >
                            <MenuItem>Erinnerung</MenuItem>
                            <MenuItem onClick={this.handleAddText}>Text</MenuItem>
                            <MenuItem>Location</MenuItem>
                        </SplitButton>
                    </ButtonGroup>
                </Modal.Footer>
        </Modal>;

        return <div className="entry" 
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}>
                <div className={"fa fa-pencil modifyButton " + (this.state.mouseOver ? "" : "hidden")} 
                     onClick={this.handleEdit}></div>
                <h3 className="title">{this.state.data.title}</h3>
                {editModal}
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
        deleteEntry(this.state.id);
    },
    handleAddText() {
    },

    handleChangeTitle() {
    
    }
});

export default Entry;
