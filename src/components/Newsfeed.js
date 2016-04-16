import React, {Component} from "react";
import Entry from "./entry/Entry.js";
import EntryStore from "../stores/EntryStore";
import { Button, Grid, Col, Row } from "react-bootstrap";
import { updateEntries, createEntry } from "../actions/EntryActions";

const smEntry = 6;
const mdEntry = 6;
const lgEntry = 4;

export default class Newsfeed extends Component {
    constructor() {
        super();
        updateEntries();
        this.state = {
            entries: EntryStore.entries,
        }
    }

    componentWillMount() {
        EntryStore.on("change", () => {
            this.setState({
                entries: EntryStore.entries
            });
        });
    }
    render() {
        const entries = this.state.entries.map((entry, i) => {
            return <Col key={entry.id} lg={lgEntry} md={mdEntry} sm={smEntry}>
                <Entry id={entry.id} />
            </Col>;
        });

        return <Grid className="newsfeed">
            <Row className="entries">
                {entries}
            </Row>
            
            <Row>
                <Col lg={12} className="footer">
                    <Button
                        className="fa fa-plus"
                        bsStyle="primary"
                        onClick={this.handleAddEntry.bind(this)}
                    />
                </Col>
            </Row>
        </Grid>;
    }

    handleAddEntry() {
        createEntry({
            title: "Neuer Eintrag"
        })
    }

    handleEntryCreated() {
         
    }
}
