import { useState } from "react";
import CallTodos from "./todos";

const Home = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
      console.log("parent render")
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <>
      <CallTodos todos={todos} addTodo={addTodo} />
      <hr />
          use callback example without callback
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

export default Home;