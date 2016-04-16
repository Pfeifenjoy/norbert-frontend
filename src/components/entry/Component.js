import React from "react";
import { Input } from "react-bootstrap";

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
            return <input
                        onChange={this.handleChange}
                        type="date"
                        value={this.props.data}
                    />
        }
        else {
            return <div></div>;
        }
    }
}

export function createComponent(comp, edit, onChange, id) {
    switch(comp.type) {
        case "text": {
            return <Description
                        data={comp.data}
                        editable={edit}
                        onChange={onChange}
                        id={id}
                        key={id}
                    />;
        }
        case "notification": {
            return <Notification
                        data={comp.data}
                        editable={edit}
                        onChange={onChange}
                        id={id}
                        key={id}
                    />
        }
        default: {
            return <div />
        }
    }
}
