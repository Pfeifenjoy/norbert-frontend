import React, {Component} from "react";
import {Modal} from "react-bootstrap";

export default class Entry extends Component {
    constructor() {
        super();
        this.state = {
            components: [],
            mouseOver: false,
            edit: false
        }
    }
    render() {
        const components = this.state.components.map((comp, i) => {
            return <div key={i} className="entryComponent">
                    {comp}
                </div>;
        });

        const modal = <Modal show={this.state.edit} onHide={this.handleEditClose.bind(this)}>
                    <Modal.Header>
                        <Modal.Title>{this.props.data.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Test</p>
                    </Modal.Body>
            </Modal>;

        return <div className="entry" onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
                <div className={"fa fa-pencil modifyButton " + (this.state.mouseOver ? "" : "hidden")} onClick={this.handleEdit.bind(this)}></div>
                <h3 className="title">{this.props.data.title}</h3>
                {components}
                {modal}
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

}
