import React from "react";
import useOnline from "./useOnline";

function CustomHook () {
    const isOnline = useOnline(navigator.online);

    return (
        <li style={ {color:isOnline ? 'green' : 'red'} }>
            {!isOnline && <p>You are offline</p>}
        </li>
    )
}

export default CustomHook;