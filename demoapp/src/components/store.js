import * as redux from "redux";
import { createStore } from "redux";

export const COUNTER_INCREMENT = "counter/increment";
export const COUNTER_DECREMENT = "counter/decrement";

const countInitialState = {
    count: 0
}

const countReducer = (state = countInitialState, action) => {
    switch(action.type) {
        case COUNTER_INCREMENT: {
            return {...state, count: state.count + 1};
        }
        case COUNTER_DECREMENT: {
            return {...state, count: state.count - 1};
        }
        default: {
            return state;
        }
    }
}

const arrayReducer = (state = [], action) => {
    switch(action.type) {
        case "push": {
            const data = [...state];
            data.push(action.value);
            return data;
        }
        case "pop": {
            const data = [...state];
            data.pop();
            return data;
        }
        default: {
            return state;
        }
    }
}

const rootReducer = redux.combineReducers({ countReducer, arrayReducer })
const store = createStore(rootReducer);
export default store;