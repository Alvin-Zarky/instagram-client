import React, { useMemo, useState } from "react";

export default function MemoTesting() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t: any): any => [...t, "New Todo"]);
  };

  return (
    <>
      {/* {calculation}
      <button onClick={clickRender}>Re render</button> */}
      <div>
        <div>
          <h2>My Todos</h2>
          {todos.map((todo, index) => {
            return <p key={index}>{todo}</p>;
          })}
          <button onClick={addTodo}>Add Todo</button>
        </div>
        <hr />
        <div>
          Count: {count}
          <button onClick={increment}>+</button>
          <h2>Expensive Calculation</h2>
          {calculation}
        </div>
      </div>
    </>
  );
}

function expensiveCalculation(num: number) {
  // console.log("Calculating...");
  for (let i = 0; i < 10000; i++) {
    console.log(i);
    // num += 1;
  }
  return num;
}

// function mathRandom(number: number): number {
//   for (let i = 0; i < 10000; i++) {
//     console.log(i);
//   }
//   console.log("over loop is running");

//   return Math.sqrt(number);
// }
