import { useState, useCallback } from "react";
import CallbackTodos from "./callbackTodos";

const CallbackHome = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
      console.log("parent render callback")
    setCount((c) => c + 1);
  };
  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
  }, [todos]);

  return (
    <>
      <CallbackTodos todos={todos} addTodo={addTodo} />
      <hr />
          use callback example with callback
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

export default CallbackHome;