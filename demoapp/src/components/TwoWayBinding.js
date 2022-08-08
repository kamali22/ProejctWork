import React from "react";

class TwoWayBinding extends React.Component{
    constructor() {
        super();
        this.state = {name: "Kamali", value: "two way"}
    }

    valueChange = function (event) {
        this.setState({value: event.target.value});
    }
    onClick = () => {
        this.setState({name: "Keerthi", value:"test"})
    }
    render() {
        return (
            <div>
                <h2>
                    <p>TwoWay Binding</p>
                    <p>hi {this.state.name}</p>
                    <input type="text" value={this.state.value} onChange={this.valueChange.bind(this)} />
                    <div>
                        <button onClick={this.onClick}>Click me!</button>
                    </div>
                    {this.state.value}
                </h2>
            </div>
        );
    }
}

export default TwoWayBinding;