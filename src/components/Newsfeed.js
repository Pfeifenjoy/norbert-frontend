import React, {Component} from "react";
import Entry from "./entry/Entry.js";
import EntryStore from "../stores/EntryStore";
import { Button, Col, Row } from "react-bootstrap";
import { updateEntries, createEntry, loadNewImages } from "../actions/EntryActions";
import DetailEntry from "./entry/DetailEntry";


const smEntry = 6;
const mdEntry = 6;
const lgEntry = 4;

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
            <Row className="entries">
                {entries}
            </Row>
            
            <Row>
                <Col xs={12} className="footer">
                    <Button
                        className="fa fa-plus addButton"
                        bsStyle="primary"
                        onClick={this.handleAddEntry.bind(this)}
                    />
                </Col>
            </Row>
            <DetailEntry />
        </div>;
    }

    handleAddEntry() {
        createEntry({
            title: "Neuer Eintrag"
        })
    }

    handleScroll(event) {
        let {scrollTop, scrollHeight, clientHeight} = event.srcElement.body;
        if(scrollTop === 0)
            return loadNewImages(false);
        let distBottum = (scrollTop + clientHeight - scrollHeight) * -1;
        if(distBottum === 0) 
            loadNewImages(true);
    }
}
