import React from "react";
import { Input, Button } from "react-bootstrap";
import constants from "../../constants";

//Abstract Class of every component.
const Component = React.createClass({
    propTypes: {
        data: React.PropTypes.node.isRequired,
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
        let rows = this.props.data.split("\n").length;
        rows = rows >= 5 ? rows : 5;
        return <Input
            type="textarea"
            placeholder="Beschreibung..."
            value={this.props.data}
            onChange={this.handleChange}
            rows={rows}
            className="textarea description"
        />;
    }
};


export class Notification extends Component {
    render() {
        return <div
                className="input-group notification"
            >
            <span className="input-group-addon fa-bell" />
            <input
                onChange={this.handleChange}
                type="date"
                className="form-control"
                value={this.props.data}
            />
        </div>;
    }
}

export class Document extends Component {
    render() {
        return <div className="input-group">
            <input className="form-control" type="text" />
            <span className="input-group-btn">
                <button className="fa-paperclip btn"></button>
            </span>
        </div>
    }
}

export class Task extends Component {
    render() {
        return <div className="input-group">
            <span
                className="input-group-addon"
            >
                <input 
                    type="checkbox"
                />
            </span>

            <input
                className="form-control"
                type="text"
            />
        </div>
    }
}

export function createComponent(comp, onChange, id) {
    switch(comp.type) {
        case constants.DESCRIPTION: {
            return <Description
                        data={comp.data}
                        onChange={onChange}
                        id={id}
                        key={id}
                    />;
        }
        case constants.NOTIFICATION: {
            return <Notification
                        data={comp.data}
                        onChange={onChange}
                        id={id}
                        key={id}
                    />;
        }
        case constants.DOCUMENT: {
            return <Document
                        data={comp.data}
                        onChange={onChange}
                        id={id}
                        key={id}
                    />;
        }
        case constants.TASK: {
            return <Task
                        data={comp.data}
                        onChange={onChange}
                        id={id}
                        key={id}
                    />;
        }
        default: {
            console.warn(`Unknow type of entry component: ${comp.type}`)
            return <div />
        }
    }
}
