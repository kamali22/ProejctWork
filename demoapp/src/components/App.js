import React from "react";
import Clock from "./Clock";
import ReduxDemo from "./redux";
import TwoWayBinding from "./TwoWayBinding";

class App extends React.Component {
    render() {
        return (
            <div>
                <TwoWayBinding />
                <Clock />
                <ReduxDemo />
            </div>
        );
    }
}

export default App;