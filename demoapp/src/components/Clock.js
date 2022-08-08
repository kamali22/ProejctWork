import React from "react";

class Clock extends React.Component {
    constructor() {
        super();
        this.state = {name: "Kamali", date: new Date()}
    }

    componentDidMount() {
        setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.setState({date: new Date()})
    }

    render() {
        return (
            <div>
                <h1>
                    <p>In clock app</p>
                    The time is {this.state.date.toLocaleTimeString()}
                </h1>
            </div>
        );
    }
}

export default Clock;