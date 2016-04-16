import React from "react";
import { Panel, Input } from "react-bootstrap";

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
            return <Input
                type="textarea"
                placeholder="Beschreibung..."
                value={this.props.data}
                onChange={this.handleChange}
            />;
        } else {
            return <div>{this.props.data}</div>;
        }
    }
};

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
    }
}
