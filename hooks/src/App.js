import React from "react";
import WithoutCleanUp from "./WithoutCleanUp";
import WithCleanUp from "./WithCleanUp";
import Counter from "./Counter";
import CustomHook from "./CustomHook";
import Todos from "./usereducer";
import Home from "./home";
import CallbackHome from "./callbackHome";
import WithoutMemo from "./withoutUseMemo";
import WithMemo from "./withUseMemo";

class App extends React.Component {
    render() {
        return (
            <div>
                <WithoutCleanUp />
                <WithCleanUp />
                <div>
                    <Counter initialCount={1} />
                </div>
                <CustomHook />
                Reducer Component
                <Todos />
                <Home />
                <CallbackHome />
                Without memo
                <WithoutMemo />
                With memo
                <WithMemo />
            </div>
        );
    }
  }
  
  export default App;