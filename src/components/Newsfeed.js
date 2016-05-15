/*
 * @author Arwed Mett
*/

import React, {Component} from "react";
import Entry from "./entry/Entry.js";
import EntryStore from "../stores/EntryStore";
import { Button, Col, Row } from "react-bootstrap";
import { updateEntries, createEntry } from "../actions/EntryActions";
import DetailEntry from "./entry/DetailEntry";


//Sizes for the entries.
const smEntry = 6;
const mdEntry = 6;
const lgEntry = 4;

/**
 * The main newsfeed containing all entries and information.
 */
export default class Newsfeed extends Component {
    constructor() {
        super();
        this.state = {
            entries: EntryStore.entries
        }
    }

    componentWillMount() {
        this.handleEntryUpdate = () => {
            this.setState({
                entries: EntryStore.entries
            });
        };
        EntryStore.on("change", this.handleEntryUpdate);
        updateEntries();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
        EntryStore.removeListener("change", this.handleEntryUpdate);
    }

    render() {
        const entries = this.state.entries.map((entry, i) => {
            return <Col key={entry.id} lg={lgEntry} md={mdEntry} sm={smEntry}>
                <Entry id={entry.id} />
            </Col>;
        });


        return <div className="newsfeed">
            <Row>
                <Col xs={12} className="header">
                    <Button
                        className="fa fa-plus addButton"
                        bsStyle="primary"
                        onClick={this.handleAddEntry.bind(this)}
                    />
                </Col>
            </Row>
            <Row className="entries">
                {entries}
            </Row>
            
            <DetailEntry />
        </div>;
    }

    handleAddEntry() {
        createEntry({
            title: "Neuer Eintrag"
        })
    }

}
