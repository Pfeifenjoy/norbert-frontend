import React, {Component} from "react";
import Entry from "./entry/Entry.js";
import EntryStore from "../stores/EntryStore";

export default class Newsfeed extends Component {
    constructor() {
        super();
        this.state = {
            entries: EntryStore.getAll().entries
        }
    }
    render() {
        const entries = [];
        for(let id in this.state.entries){
            entries.push(
                <div key={id} className="col-lg-3 col-md-6 col-sm-8">
                    <Entry id={id} data={this.state.entries[id]} />
                </div>
            );

        }
        return <div className="newsfeed">
            <div className="entries col-lg-8">
                {entries}
            </div>
            </div>;
    }
}
