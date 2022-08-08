import React from "react";
import store, {COUNTER_INCREMENT, COUNTER_DECREMENT} from "./store";

class ReduxDemo extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Redux"
        }
    }    
    increment = () => {
        store.dispatch({ type: COUNTER_INCREMENT});
        console.log(store.getState());
    }

    decrement = () => {
        store.dispatch({ type: COUNTER_DECREMENT});
        console.log(store.getState());
    }
    
    push = () => {
        store.dispatch({type: "push", value: Math.random()});
        console.log(store.getState());
    }

    pop = () => {
        store.dispatch({type: "pop"});
        console.log(store.getState());
    }

    render() {
        return(
            <div>
                <h2>Welcome to {this.state.title}!</h2>
                Here is the example of Redux
                <div>
                    <button onClick={this.increment}>Increment</button>
                    <button onClick={this.decrement}>Decrement</button>
                </div>
                <div>
                    <button onClick={this.push}>Push</button>
                    <button onClick={this.pop}>Pop</button>
                </div>
            </div>
        );
    }   
}

export default ReduxDemo;