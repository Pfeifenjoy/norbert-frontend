import React from "react";
import { Input, Button } from "react-bootstrap";

//Abstract Class of every component.
const Component = React.createClass({
    getInitialState() {
        return {
            editable: this.props.editable
        }
    },
    getDefaultProps() {
        return {
            editable: false
        }
    },
    propTypes: {
        data: React.PropTypes.node.isRequired,
        editable: React.PropTypes.bool,
        onChange: React.PropTypes.func
    },
    handleChange(oEvent) {
        this.setState({data: oEvent.target.value});
        this.props.onChange({
            data: oEvent.target.value,
            id: this.props.id
        })
    },
    render() {}
});




export class Description extends Component {
    render() {
        if(this.state.editable) {
            let rows = this.props.data.split("\n").length;
            rows = rows >= 5 ? rows : 5;
            return <Input
                type="textarea"
                placeholder="Beschreibung..."
                value={this.props.data}
                onChange={this.handleChange}
                rows={rows}
                className="textarea"
            />;
        } else {
            return <div className="description">{this.props.data}</div>;
        }
    }
};


export class Notification extends Component {
    render() {
        if(this.state.editable) {
            return <div
                        className="input-group"
                    >
                    <input
                            onChange={this.handleChange}
                            type="date"
                            className="form-control"
                            value={this.props.data}
                        />
                </div>
        }
        else {
            return <div className="fa-bell"></div>;
        }
    }
}

export class Document extends Component {
    render() {
        if(this.state.editable) {
            return <div className="input-group">
                <input className="form-control" type="text" />
                <span className="input-group-btn">
                    <button className="fa-paperclip btn"></button>
                </span>
            </div>
        }
        else {
            return <div className="fa-file"></div>;
        }
    }
}

export function createComponent(comp, edit, onChange, id) {
    switch(comp.type) {
        case "text": {
            return <div className="description">
                <Description
                        data={comp.data}
                        editable={edit}
                        onChange={onChange}
                        id={id}
                        key={id}
                    />
                </div>;
        }
        case "notification": {
            return <div className="notification">
                    <Notification
                        data={comp.data}
                        editable={edit}
                        onChange={onChange}
                        id={id}
                        key={id}
                    />
                </div>;
        }
        case "document": {
            return <div className="document">
                    <Document
                        data={comp.data}
                        editable={edit}
                        onChange={onChange}
                        id={id}
                        key={id}
                    />
                </div>;
        }
        default: {
            return <div />
        }
    }
}
