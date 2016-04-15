import React, {Component} from "react";
import Entry from "./entry/Entry.js";
import EntryStore from "../stores/EntryStore";
import { Button, Grid, Col, Row } from "react-bootstrap";
import { updateEntries } from "../actions/EntryActions";

const smEntry = 6;
const mdEntry = 6;
const lgEntry = 4;

export default class Newsfeed extends Component {
    constructor() {
        super();
        updateEntries();
        this.state = {
            entries: EntryStore.entries,
            newEntry: undefined
        }
    }

    componentWillMount() {
        EntryStore.on("change", () => {
            console.log(EntryStore.entries)
            this.setState({
                entries: EntryStore.entries
            });
        });
    }
    render() {
        let lastI = 0;
        const entries = this.state.entries.map((entry, i) => {
            ++lastI;
            return <Col key={i} lg={lgEntry} md={mdEntry} sm={smEntry}>
                <Entry data={entry} />
            </Col>;
        });
        if(this.state.newEntry) {
            entries.push(
                <Col key={lastI} lg={lgEntry} md={mdEntry} sm={smEntry}>
                    <Entry
                        data={this.state.newEntry}
                        edit={true}
                        onSave={this.handleEntryCreated.bind(this)}
                        onCancel={this.handleAddEntryCancel.bind(this)}
                    />
                </Col>
            );
        }

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
        this.setState({
            newEntry: {}
        });
    }

    handleEntryCreated() {
         
    }
    handleAddEntryCancel() {
        this.setState({
            newEntry: undefined
        })
    
    }
}
