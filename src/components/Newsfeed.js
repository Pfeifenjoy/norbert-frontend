import React, {Component} from "react";
import Entry from "./entry/Entry.js";

export default class Newsfeed extends Component {
    constructor() {
        super();
        this.state = {
            entries: [<Entry />, <Entry />, <Entry />, <Entry />, <Entry />, <Entry />, <Entry />, <Entry />, <Entry />, <Entry />, <Entry />, <Entry />]
        }
    }
    render() {
        const entries = this.state.entries.map((entry, i) => {
            return <div key={i} className="col-lg-3 col-md-6 col-sm-8">
                {entry}
            </div>;
        });
        return <div className="newsfeed">
            <div className="entries col-lg-8">
                {entries}
            </div>
            </div>;
    }
}
