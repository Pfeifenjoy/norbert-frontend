import React, {Component} from "react";
import {Modal, Button, ButtonGroup} from "react-bootstrap";
import AddComponentDialog from "./AddComponentDialog";

export default class Entry extends Component {
    constructor() {
        super();
        this.state = {
            components: [],
            mouseOver: false,
            edit: false
        };
    }
    render() {
        const components = this.state.components.map((comp, i) => {
            return <div key={i} className="entryComponent">
                    {comp}
                </div>;
        });

        const editModal = <Modal show={this.state.edit} onHide={this.handleEditClose.bind(this)}>
                <Modal.Header>
                    <Modal.Title>{this.props.data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button className="fa fa-trash"
                            bsStyle="danger"
                            bsSize="medium"
                        ></Button>
                        <AddComponentDialog />
                    </ButtonGroup>
                </Modal.Footer>
        </Modal>;

        return <div className="entry" 
                    onMouseOver={this.handleMouseOver.bind(this)}
                    onMouseOut={this.handleMouseOut.bind(this)}>
                <div className={"fa fa-pencil modifyButton " + (this.state.mouseOver ? "" : "hidden")} 
                     onClick={this.handleEdit.bind(this)}></div>
                <h3 className="title">{this.props.data.title}</h3>
                {components}
                {editModal}
            </div>;
    }
    handleMouseOver(oEvent) {
        this.setState({mouseOver: true});
    }
    handleMouseOut(oEvent) {
        this.setState({mouseOver: false});
    }
    handleEdit() {
        this.setState({edit: true});
    }
    handleEditClose() {
        this.setState({edit: false});
    }
    handleAddComponent() {
        
    }
}
