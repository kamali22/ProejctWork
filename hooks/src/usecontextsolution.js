import { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";

const UserContext = createContext()

function Component1() {
const [user, setUser] = useState("Jesse Hall");

    return (
        <UserContext.Provider value={user}>
        <h1>{`Hello ${user}!`}</h1>
        <Component2 user={user} />
        </UserContext.Provider>
)   ;
}
function Component2(user) {
    return (
    <>
        <h1>Component 2</h1>
        <h2>Hello {user}!</h2>
    </>
    );
}

function Component5() {
const user = useContext(UserContext);

return (
    <>
    <h1>Component 5</h1>
    <h2>Hello {user} again!</h2>
    </>
);
}

  export default Component5