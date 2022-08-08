import React from "react";
import ChildA from "./Fragment";
import ChildB from "./Child";
import FancyButton from "./ForwardRef";
import Counter from "./Hooks";
import FriendStatus from "./EffectHooks";

class App extends React.Component {
    ref = React.createRef();
    render() {
        return (
            <React.Fragment>
                <ChildA />
                <ChildB />
                <Counter />
                <FancyButton ref={this.ref}>Fancy component</FancyButton>
            </React.Fragment>
        )
    }
}

export default App;