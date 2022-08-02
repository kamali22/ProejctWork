import React from "react";
import Card from "./Card";

function SearchList({ filteredPersons }) {
  const filtered = filteredPersons.map((person) => (
    <Card key={person.id} person={person} />
  ));
  console.log("in search list", filtered);
  return <div>{filtered}</div>;
}

export default SearchList;
