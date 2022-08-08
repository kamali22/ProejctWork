import React from "react";

function SearchBar(props) {
    console.log("IN SEARCH BAR COMPONENT", props.value);
    return props.value;
}

export default SearchBar;