import React, {Component} from "react";
import { startEdit, updateEntry } from "../../actions/EntryActions";
import EntryStore from "../../stores/EntryStore";
import constants from "../../constants";

const Entry = React.createClass({
    getInitialState() {
        return {
            mouseOver: false,
            data: EntryStore.getEntry(this.props.id)
        };
    },
    propTypes: {
        id: React.PropTypes.string.isRequired,
    },

    componentWillMount() {
        this.handleEntryStoreChange = () => {
            let data = EntryStore.getEntry(this.props.id);
            if(data) {
                this.setState({data});
            }
        }
        EntryStore.on("change", this.handleEntryStoreChange);
        this.handleEntryUpdate = id => {
            if(this.props.id === id) {
                this.setState({
                    data: EntryStore.getEntry(this.props.id)
                })
            }
        }
        EntryStore.on("updateEntry", this.handleEntryUpdate);
    },

    componentWillUnmount() {
        EntryStore.removeListener("change", this.handleEntryStoreChange);
        EntryStore.removeListener("updateEntry", this.handleEntryUpdate);
    },


    getComponents(type) {
        if(type) {
            return this.state.data.components.filter(comp => {
                return comp.type === type;
            })
        }
        return this.state.data.components || [];
    },

    hasCompWithType(type){
        return this.getComponents().find(comp => {
            return comp.type === type;
        }) ? true : false;
    },

    render() {

        const descriptions = this.getComponents(constants.DESCRIPTION)
        .map((comp, i) => {
            return <div className="breakWord" key={i}>{comp.data}</div>;
        })

        const tasks = this.getComponents(constants.TASK)
        .map((comp, i) => {
            return <div className="task breakWord" key={i}>
                <input 
                    type="checkbox" 
                    checked={comp.data.finished}
                    onChange={this.handleTaskChange.bind(this, i)}
                />
                <span className={comp.data.finished ? "lineThrough" : ""}>{comp.data.text}</span>
            </div>
        })

        const notificationSign = this.hasCompWithType(constants.NOTIFICATION) ? <span className="notificationSign fa fa-bell" /> : [];
        const documentSign = this.hasCompWithType(constants.DOCUMENT) ? <span className="documentSign fa fa-file" /> : [];
        
        const signs = <div className="signs">{notificationSign}{documentSign}</div>;

        return <div className="entry" 
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}>
                <div className={"fa fa-pencil modifyButton " + (this.state.mouseOver ? "" : "hidden")} 
                     onClick={startEdit.bind({}, this.props.id)}></div>
                <h3 className="title">{this.state.data.title}</h3>
                {descriptions}
                {tasks}
                {signs}
            </div>;
    },
    handleMouseOver(oEvent) {
        this.setState({mouseOver: true});
    },
    handleMouseOut(oEvent) {
        this.setState({mouseOver: false});
    },

    handleTaskChange(i, oEvent) {
        let tasks = this.getComponents(constants.TASK);
        tasks[i].data.finished = !tasks[i].data.finished;
        this.setState({ data: this.state.data });
        updateEntry(this.state.data, this.props.id);
    }
});

export default Entry;
