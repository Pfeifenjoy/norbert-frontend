/**
 * @author Arwed Mett
 */
import React, {Component} from "react";
import { startEdit, updateEntry, hideInformation } from "../../actions/EntryActions";
import EntryStore from "../../stores/EntryStore";
import constants from "../../constants";
import moment from "moment";


/**
 * A tile containing an entry or an information.
 */
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
        //unregister all listeners
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
        .map(comp => {
            return <div key={comp.id}>{comp.data.text}</div>;
        })

        const tasks = this.getComponents(constants.TASK)
        .map(comp => {
            let finished = JSON.parse(comp.data.finished);
            return <div className="task" key={comp.id}>
                <input 
                    type="checkbox" 
                    checked={finished}
                    onChange={this.handleTaskChange.bind(this, comp.id)}
                />
                <span className={finished ? "lineThrough" : ""}>{comp.data.text}</span>
            </div>
        })

        const documents = this.getComponents(constants.DOCUMENT)
        .map(comp => {
            let content = comp.data.processing ? 
                <p>Datei wird verarbeitet...</p> 
                :
                <a 
                    className="fa fa-file"
                    href={"http://" + comp.data.url}
                    target="_blank"
                >
                    {" " + comp.data.name}
                </a>;
            return <div key={comp.id}>
                {content}
            </div>
        });

        const notifications = this.getComponents(constants.NOTIFICATION)
        .map(comp => {
            return <div key={comp.id}>
                <p>{(() => {return moment(new Date(parseInt(comp.data.date))).locale("de").fromNow()})()}</p>
            </div>
        });

        const notificationSign = this.hasCompWithType(constants.NOTIFICATION) ? <span className="notificationSign fa fa-bell" /> : [];
        const documentSign = this.hasCompWithType(constants.DOCUMENT) ? <span className="documentSign fa fa-file" /> : [];
        
        const signs = <div className="signs">{notificationSign}{documentSign}</div>;

        const edit = this.state.data.type === constants.ENTRY ? <div
            className={"fa fa-pencil modifyButton " + (this.state.mouseOver ? "" : "hidden")} 
            onClick={startEdit.bind({}, this.props.id)}>
        </div>
            :
        <div
            className={`fa fa-times modifyButton rejectAction ${this.state.mouseOver ? "" : "hidden"}`}
            onClick={this.hideInformation}
        />;

        const className = (this.state.data.type === constants.ENTRY ? "entry" : "information")
                            + " newsfeedObject";
        return <div className={className}
                    onMouseOver={this.handleMouseOver}
                    onMouseOut={this.handleMouseOut}>
                {edit}
                <h3 className="title">{this.state.data.title}</h3>
                {descriptions}
                {tasks}
                {documents}
                {notifications}
                {signs}
            </div>;
    },
    handleMouseOver(oEvent) {
        this.setState({mouseOver: true});
    },
    handleMouseOut(oEvent) {
        this.setState({mouseOver: false});
    },

    handleTaskChange(id, oEvent) {
        let task = this.state.data.components.find(comp => comp.id === id);
        task.data.finished = !JSON.parse(task.data.finished);
        this.setState({ data: this.state.data });
        updateEntry(this.state.data, this.props.id);
    },

    hideInformation(oEvent) {
        hideInformation(this.props.id);
    }
});

export default Entry;
