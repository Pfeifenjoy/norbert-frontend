import React, {Component} from "react";

export default class Entry extends Component {
    constructor() {
        super();
        this.state = {
            components: [],
            mouseOver: false
        }
    }
    render() {
        const components = this.state.components.map((comp, i) => {
            return <div key={i} className="entryComponent">
                    {comp}
                </div>;
        });

        return <div className="entry" onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
                <div className={"fa fa-pencil modifyButton " + (this.state.mouseOver ? "" : "hidden")}></div>
                <h3 className="title">Test</h3>
                {components}
            </div>;
    }
    handleMouseOver(oEvent) {
        this.setState({mouseOver: true});
    }

    handleMouseOut(oEvent) {
        this.setState({mouseOver: false});
    }

}
